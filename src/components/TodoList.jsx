import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import debounce from "lodash/debounce";
import styles from "./TodoList.module.css";

const API_URL = "http://localhost:5000/todos";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get(API_URL);
    setTodos(response.data);
  };

  const addTodo = () => {
    if (!newTodo.trim()) return;

    const newTask = { title: newTodo };

    axios.post(API_URL, newTask).then((response) => {
      setTodos([...todos, response.data]);
      setNewTodo("");
    });
  };

  const handleSearch = useCallback(
    debounce((query) => {
      setSearchQuery(query);
    }, 500),
    []
  );

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTodos = isSorted
    ? [...filteredTodos].sort((a, b) => a.title.localeCompare(b.title))
    : filteredTodos;

  return (
    <div className={styles.container}>
      <h2>Список дел</h2>

      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="Добавить задачу..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Добавить</button>
      </div>

      <input
        type="text"
        placeholder="Поиск..."
        onChange={(e) => handleSearch(e.target.value)}
      />

      <button className={styles.sortButton} onClick={() => setIsSorted(!isSorted)}>
        {isSorted ? "Отключить сортировку" : "Сортировать A-Z"}
      </button>

      <ul className={styles.todoList}>
        {sortedTodos.map((todo) => (
          <li key={todo.id} className={styles.todoItem}>
            <Link to={`/task/${todo.id}`} className={styles.todoLink}>
              {todo.title.length > 30 ? `${todo.title.slice(0, 30)}...` : todo.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
