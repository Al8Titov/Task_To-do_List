import { useState } from "react";
import { useTodos } from "../context/TodoContext";
import styles from "./TodoList.module.css";

const TodoList = () => {
  const { todos, addTodo, deleteTodo, handleSearch, toggleSort, isSorted } = useTodos();
  const [newTodo, setNewTodo] = useState("");

  const handleAdd = () => {
    addTodo(newTodo);
    setNewTodo("");
  };

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
        <button onClick={handleAdd}>Добавить</button>
      </div>

      <input
        type="text"
        placeholder="Поиск..."
        onChange={(e) => handleSearch(e.target.value)}
      />

      <button className={styles.sortButton} onClick={toggleSort}>
        {isSorted ? "Обычный порядок" : "Сортировать A-Z"}
      </button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <button className={styles.deleteBtn} onClick={() => deleteTodo(todo.id)}>
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
