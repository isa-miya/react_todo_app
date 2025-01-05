import { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';

function App() {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState('');

	const addTask = () => {
		if (newTodo.trim()) {
			axios
				.post(`${process.env.REACT_APP_API_URL}/todo/create`, {
					todo: newTodo.trim(),
				})
				.then((response) => {
					const responseTodo = response.data.todo;
					setTodos((prevTodos) => [...prevTodos, responseTodo]);
					setNewTodo('');
				})
				.catch((error) => {
					console.error('エラー', error);
				});
		}
	};

	const toggleTask = (id) => {
		const targetTodo = todos.find((todo) => todo.id === id);
		if (!targetTodo) return;

		axios
			.put(`${process.env.REACT_APP_API_URL}/todo/update/${id}`, {
				completed: !targetTodo.completed,
			})
			.then(() => {
				setTodos((prevTodos) =>
					prevTodos.map((prevTodo) =>
						prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo
					)
				);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const deleteTask = (id) => {
		const deleteTodo = todos.find((todo) => todo.id === id);
		if (!deleteTodo) return;

		axios
			.delete(`${process.env.REACT_APP_API_URL}/todo/delete/${id}`)
			.then(() => {
				setTodos((prevTodos) => prevTodos.filter((prevTodo) => prevTodo.id !== id));
			})
			.catch((error) => {
				console.error(error);
			});
	};

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_URL}/todo`)
			.then((response) => {
				console.log(response.data);
				setTodos(response.data.todos);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	console.log('tasks =>', todos);

	return (
		<div className="min-h-screen bg-gray-300 flex items-center justify-center">
			<div className="w-full max-w-md bg-white p-6 rounded shadow-lg">
				<h1 className="text-2xl font-bold text-center mb-4">Todo App</h1>
				<div className="flex mb-4">
					<input
						type="text"
						className="flex-1 p-2 border rounded-1 focus:outline-none"
						value={newTodo}
						onChange={(e) => setNewTodo(e.target.value)}
					/>
					<button
						className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
						onClick={addTask}
					>
						Add
					</button>
				</div>
				<ul className="space-y-2">
					{todos.map((todo) => (
						<li
							key={todo.id}
							className={`flex justify-between items-center p-2 border rounded ${
								todo.completed ? 'line-through text-gray-500' : ''
							}`}
						>
							<div className="flex items-center">
								<input
									type="checkbox"
									className="mr-2"
									onChange={() => toggleTask(todo.id)}
									checked={todo.completed}
								/>
								<span>{todo.text}</span>
							</div>
							<button
								className="text-red-500 hover:text-red-700"
								onClick={() => deleteTask(todo.id)}
							>
								Delete
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default App;
