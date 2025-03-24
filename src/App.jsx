import TodoList from "./components/TodoList";
import { TodoProvider } from "./context/TodoContext";
import "./styles.css";

function App() {
  return (
    <TodoProvider>
      <TodoList />
    </TodoProvider>
  );
}

export default App;
