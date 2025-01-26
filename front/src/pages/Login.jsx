import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const navigate = useNavigate();
	const { login } = useAuth();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		login(formData, navigate);
	};

	return (
		<div className="min-h-screen bg-gray-300 flex items-center justify-center">
			<form className="w-full max-w-sm bg-white p-6 rounded shadow-lg" onSubmit={handleSubmit}>
				<h1 className="text-2xl font-bold text-center mb-4">Log In</h1>
				<input
					type="email"
					name="email"
					placeholder="Email"
					className="mb-4 p-2 border rounded w-full"
					value={formData.email}
					onChange={handleChange}
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					className="mb-4 p-2 border rounded w-full"
					value={formData.password}
					onChange={handleChange}
				/>
				<button
					type="submit"
					className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
				>
					Log In
				</button>
			</form>
		</div>
	);
}

export default Login;
