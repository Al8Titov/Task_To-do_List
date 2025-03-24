import { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import { useSearch } from "../hooks/useSearch";
import styles from "./TodoList.module.css";

const TodoList = () => {
  const { todos, addTodo, deleteTodo, isSorted, setIsSorted } = useTodos();
  const { searchQuery, handleSearch } = useSearch();
  const [newTodo, setNewTodo] = useState("");

  const filteredTodos = searchQuery
  ? todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : todos;

  const sortedTodos = isSorted
  ? filteredTodos.toSorted((a, b) => a.title.localeCompare(b.title))
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
       <button onClick={() => {
  addTodo(newTodo); // Передаем значение
  setNewTodo("");   // Очищаем поле ввода
}}>
  Добавить
</button>
      </div>

      <input
        type="text"
        placeholder="Поиск..."
        onChange={(e) => handleSearch(e.target.value)}
      />

      <button className={styles.sortButton} onClick={() => setIsSorted(!isSorted)}>
        {isSorted ? "Обычный порядок" : "Сортировать A-Z"}
      </button>

      <ul>
        {sortedTodos.map((todo) => (
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
