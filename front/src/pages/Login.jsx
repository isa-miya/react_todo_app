import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post(`${process.env.REACT_APP_API_URL}/users/signin`, formData, { withCredentials: true })
			.then(() => {
				alert('ログインに成功しました');
				setFormData({
					email: '',
					password: '',
				});
				navigate('/todo');
			})
			.catch((error) => {
				alert('ログインに失敗しました');
				console.error(error);
			});
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
