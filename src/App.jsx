import { useEffect, useState } from 'react';
import { ref, set, push, onValue, remove, update } from 'firebase/database'; 
import { database } from './firebase'; 
import SearchBar from './components/SearchBar';
import TodoList from './components/todoList';
import TodoForm from './components/TodoForm';

const App = () => {
  const [todos, setTodos] = useState([]); // Для хранения задач
  const [searchQuery, setSearchQuery] = useState('');
  const [isSorted, setIsSorted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 5;

  // Загружаем данные с Firebase при монтировании компонента
  useEffect(() => {
    const todosRef = ref(database, 'todos');
    const unsubscribe = onValue(todosRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const todosArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
  
        setTodos(todosArray);
      } else {
        console.log('Нет данных');
      }
    });
  
    return () => unsubscribe();
  }, []);
  

  //Фильтрация по поисковому запросу
  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //Сортировка задач по алфавиту
  const sortedTodos = isSorted
    ? [...filteredTodos].sort((a, b) => a.title.localeCompare(b.title))
    : filteredTodos;

  const totalPages = Math.ceil(sortedTodos.length / todosPerPage);
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = sortedTodos.slice(indexOfFirstTodo, indexOfLastTodo);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Функция для добавления задачи
  const addTodo = (title) => {
    const newTodo = {
      title,
      completed: false,
    };
  
    const newTodoRef = push(ref(database, 'todos'));
    set(newTodoRef, newTodo).catch((error) => {
      console.error('Ошибка добавления задачи:', error);
    });
  };
  
  

  // Удаление задачи из Firebase
  const deleteTodo = (id) => {
    const todoRef = ref(database, `todos/${id}`);
    remove(todoRef)
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      })
      .catch((error) => console.error('Ошибка удаления:', error));
  };

  // Обновление статуса задачи в Firebase
  const toggleTodo = (id, completed) => {
    const todoRef = ref(database, `todos/${id}`);
    update(todoRef, {
      completed: !completed,
    })
      .then(() => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !completed } : todo
          )
        );
      })
      .catch((error) => console.error('Ошибка обновления:', error));
  };

  const editTodo = (id, newTitle) => {
    const todoRef = ref(database, `todos/${id}`);
    update(todoRef, { title: newTitle })
      .then(() => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, title: newTitle } : todo
          )
        );
      })
      .catch((error) => console.error('Ошибка редактирования:', error));
  };
  

  return (
    <div>
      <h1>📋 Мой список дел</h1>

      {/* Поле поиска */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Форма добавления задач */}
      <TodoForm addTodo={addTodo} />

      {/* Кнопка сортировки */}
      <button onClick={() => setIsSorted((prev) => !prev)}>
        {isSorted ? 'Убрать сортировку' : 'Сортировать по алфавиту'}
      </button>

      {/* Список задач */}
      <TodoList
        todos={currentTodos}
        deleteTodo={deleteTodo}
        toggleTodo={toggleTodo}
        editTodo={editTodo}
      />

      {/* Пагинация */}
      <div>
        <button onClick={prevPage} disabled={currentPage === 1}>
          ⬅ Предыдущая
        </button>
        <span>
          Страница {currentPage} из {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Следующая ➡
        </button>
      </div>
    </div>
  );
};

export default App;
