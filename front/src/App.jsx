import { useState } from 'react';

import './App.css';

function App() {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState('');
	const [id, setId] = useState(1);

	const addTask = () => {
		if (newTodo.trim()) {
			setTodos([...todos, { id: id, text: newTodo, completed: false }]);
			setId(id + 1);
			setNewTodo('');
		}
	};

	const toggleTask = (id) => {
		setTodos(
			todos.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
		);
	};

	const deleteTask = (id) => {
		setTodos(todos.filter((taks) => taks.id !== id));
	};

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
