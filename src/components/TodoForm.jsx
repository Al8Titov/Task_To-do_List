import { useState } from "react";
import PropTypes from "prop-types";

const TodoForm = ({ addTodo }) => {
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo) {
      addTodo(newTodo);  // Добавляем новую задачу
      setNewTodo("");  // Очищаем поле ввода
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Новая задача"
      />
      <button type="submit">Добавить</button>
    </form>
  );
};

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,  // Проверяем, что addTodo — функция
};

export default TodoForm;
