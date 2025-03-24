import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import debounce from 'lodash/debounce';

const API_URL = 'http://localhost:5000/todos';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
	const [todos, setTodos] = useState([]);
	const [isSorted, setIsSorted] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		fetchTodos();
	}, []);

	const fetchTodos = async () => {
		const response = await axios.get(API_URL);
		setTodos(response.data);
	};

	const addTodo = (title) => {
		if (!title.trim()) return;

		const newTask = { title };

		axios.post(API_URL, newTask).then((response) => {
			setTodos([...todos, response.data]);
		});
	};

	const deleteTodo = (id) => {
		axios.delete(`${API_URL}/${id}`).then(() => {
			setTodos((prev) => prev.filter((todo) => todo.id !== id));
		});
	};

	const handleSearch = useCallback(
		debounce((query) => {
			setSearchQuery(query);
		}, 500),
		[],
	);

	const toggleSort = () => {
		setIsSorted((prev) => !prev);
	};

	const filteredTodos = todos.filter((todo) =>
		todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	const sortedTodos = isSorted
		? [...filteredTodos].sort((a, b) => a.title.localeCompare(b.title))
		: filteredTodos;

	return (
		<TodoContext.Provider
			value={{
				todos: sortedTodos,
				addTodo,
				deleteTodo,
				handleSearch,
				toggleSort,
				isSorted,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};

// Добавляем проверку типов
TodoProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

// Хук для использования контекста
export const useTodos = () => {
	return useContext(TodoContext);
};
