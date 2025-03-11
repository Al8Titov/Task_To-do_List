import { useState } from "react";
import PropTypes from "prop-types";

const TodoForm = ({ addTodo }) => {
  const [newTodo, setNewTodo] = useState(""); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo.trim()); 
      setNewTodo(""); 
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
      <button type="submit">➕</button>
    </form>
  );
};

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default TodoForm;
