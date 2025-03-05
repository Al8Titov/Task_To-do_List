
import PropTypes from "prop-types";

const TodoItem = ({ todo, deleteTodo }) => {
  return (
    <li>
      {todo.title}{" "}
      <button onClick={() => deleteTodo(todo.id)}>Удалить</button>
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoItem;
