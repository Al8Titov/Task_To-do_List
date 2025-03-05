import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import TodoList from "./components/todoList";
import TodoForm from "./components/TodoForm";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Ошибка загрузки:", error));
  }, []);

  //Фильтрация по поисковому запросу
  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //Сортировка задач по алфавиту
  const sortedTodos = isSorted
    ? [...filteredTodos].sort((a, b) => a.title.localeCompare(b.title))
    : filteredTodos;

  //Функция добавления новой задачи
  const addTodo = (title) => {
    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  //Функция удаления задачи
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>Список дел</h1>

      {/* Поле поиска */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Форма добавления задач */}
      <TodoForm addTodo={addTodo} />

      {/* Кнопка для сортировки */}
      <button onClick={() => setIsSorted((prev) => !prev)}>
        {isSorted ? "Убрать сортировку" : "Сортировать по алфавиту"}
      </button>

      {/* Список дел с учетом поиска и сортировки */}
      <TodoList todos={sortedTodos} deleteTodo={deleteTodo} />
    </div>
  );
};

export default App;
