import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/todos';

export const useTodos = () => {
	const [todos, setTodos] = useState([]);
	const [isSorted, setIsSorted] = useState(false);

	useEffect(() => {
		fetchTodos();
	}, []);

	const fetchTodos = async () => {
		try {
			const response = await axios.get(API_URL);
			setTodos(response.data);
		} catch (error) {
			console.error('Ошибка загрузки задач:', error);
		}
	};

	const addTodo = async (title) => {
		if (!title.trim()) return;

		try {
			const response = await axios.post(API_URL, { title });
			setTodos((prevTodos) => [...prevTodos, response.data]);
		} catch (error) {
			console.error('Ошибка добавления задачи:', error);
		}
	};

	const deleteTodo = async (id) => {
		try {
			await axios.delete(`${API_URL}/${id}`);
			setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
		} catch (error) {
			console.error('Ошибка удаления задачи:', error);
		}
	};

	return { todos, addTodo, deleteTodo, isSorted, setIsSorted };
};
