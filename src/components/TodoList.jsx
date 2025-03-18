import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/todos";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");


  useEffect(() => {
    axios.get(API_URL).then((response) => setTodos(response.data));
  }, []);


  const addTodo = () => {
    if (!newTodo.trim()) return;

    const newTask = { title: newTodo };

    axios.post(API_URL, newTask).then((response) => {
      setTodos([...todos, response.data]);
      setNewTodo("");
    });
  };


  const deleteTodo = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => {
      setTodos(todos.filter((todo) => todo.id !== id));
    });
  };

  return (
    <div>
      <h2>Список дел</h2>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Добавить</button>

      <ul>
        {todos.map((todo) => (
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
