import { useState } from 'react';
import './App.css';

function App() {
	const [tasks, setTasks] = useState([]);
	const [todo, setTodo] = useState('');
	const [id, setId] = useState(1);

	const addTask = () => {
		if (todo.trim()) {
			setTasks([...tasks, { id: id, text: todo, completed: false }]);
			setId(id + 1);
			setTodo('');
		}
	};

	const toggleTask = (id) => {
		setTasks(
			tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
		);
	};

	const deleteTask = (id) => {
		setTasks(tasks.filter((taks) => taks.id !== id));
	};

	console.log('tasks =>', tasks);

	return (
		<div className="min-h-screen bg-gray-300 flex items-center justify-center">
			<div className="w-full max-w-md bg-white p-6 rounded shadow-lg">
				<h1 className="text-2xl font-bold text-center mb-4">Todo App</h1>
				<div className="flex mb-4">
					<input
						type="text"
						className="flex-1 p-2 border rounded-1 focus:outline-none"
						value={todo}
						onChange={(e) => setTodo(e.target.value)}
					/>
					<button
						className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
						onClick={addTask}
					>
						Add
					</button>
				</div>
				<ul className="space-y-2">
					{tasks.map((task) => (
						<li
							key={task.id}
							className={`flex justify-between items-center p-2 border rounded ${
								task.completed ? 'line-through text-gray-500' : ''
							}`}
						>
							<div className="flex items-center">
								<input
									type="checkbox"
									className="mr-2"
									onChange={() => toggleTask(task.id)}
									checked={task.completed}
								/>
								<span>{task.text}</span>
							</div>
							<button
								className="text-red-500 hover:text-red-700"
								onClick={() => deleteTask(task.id)}
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
