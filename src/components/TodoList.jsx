import PropTypes from "prop-types";
import TodoItem from "./TodoItem";
import styles from "./TodoList.module.css";

const TodoList = ({ todos, deleteTodo, toggleTodo, editTodo }) => {
  return (
    <div className={styles["app-container"]}>
      {todos.length === 0 ? (
        <div className={styles.loader}>Задач нет</div>
      ) : (
        <ul className={styles["todo-list"]}>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              deleteTodo={deleteTodo}
              toggleTodo={toggleTodo}
              editTodo={editTodo}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
};

export default TodoList;
