import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import debounce from "lodash/debounce";

const API_URL = "http://localhost:5000/todos";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSorted, setIsSorted] = useState(false);

  // Получаем список задач
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get(API_URL);
    setTodos(response.data);
  };

  // Добавление новой задачи
  const addTodo = () => {
    if (!newTodo.trim()) return;

    const newTask = { title: newTodo };

    axios.post(API_URL, newTask).then((response) => {
      setTodos([...todos, response.data]);
      setNewTodo("");
    });
  };

  // Удаление задачи
  const deleteTodo = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => {
      setTodos(todos.filter((todo) => todo.id !== id));
    });
  };

  // Обработчик поиска (с `debounce`)
  const handleSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
    }, 500),
    []
  );

  // Фильтрация задач по поисковому запросу
  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Сортировка по алфавиту
  const sortedTodos = isSorted
    ? [...filteredTodos].sort((a, b) => a.title.localeCompare(b.title))
    : filteredTodos;

  return (
    <div>
      <h2>Список дел</h2>

      <input
        type="text"
        placeholder="Добавить задачу..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Добавить</button>

      <br />

      <input
        type="text"
        placeholder="Поиск..."
        onChange={(e) => handleSearch(e.target.value)}
      />

      <button onClick={() => setIsSorted(!isSorted)}>
        {isSorted ? "Обычный порядок" : "Сортировать A-Z"}
      </button>

      <ul>
        {sortedTodos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => deleteTodo(todo.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
