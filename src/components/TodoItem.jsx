import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./TodoList.module.css";

const TodoItem = ({ todo, deleteTodo, toggleTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleSave = () => {
    if (newTitle.trim()) {
      editTodo(todo.id, newTitle.trim());
      setIsEditing(false);
    }
  };

  return (
    <li className={`${styles["todo-item"]} ${todo.completed ? styles.completed : ""}`}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <div className={styles["todo-actions"]}>
            <button className={styles["save-btn"]} onClick={handleSave}>💾</button>
            <button className={styles["cancel-btn"]} onClick={() => setIsEditing(false)}>❌</button>
          </div>
        </>
      ) : (
        <>
          <span>{todo.title}</span>
          <div className={styles["todo-actions"]}>
            <button
              className={styles["complete-btn"]}
              onClick={() => toggleTodo(todo.id, todo.completed)}
            >
              ✅
            </button>
            <button className={styles["edit-btn"]} onClick={() => setIsEditing(true)}>
              ✏️
            </button>
            <button
              className={styles["delete-btn"]}
              onClick={() => deleteTodo(todo.id)}
            >
              🗑️
            </button>
          </div>
        </>
      )}
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
};

export default TodoItem;
