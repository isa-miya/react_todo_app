import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});

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
			.post(`${process.env.REACT_APP_API_URL}/users/signup`, formData)
			.then(() => {
				alert('ユーザーが作成されました');
				setFormData({
					name: '',
					email: '',
					password: '',
				});
			})
			.catch((error) => {
				console.error(error);
				alert('作成中にエラーが発生しました。もう一度やり直してください。');
			});
	};

	console.log(formData);

	return (
		<div className="min-h-screen bg-gray-300 flex items-center justify-center">
			<form className="w-full max-w-sm bg-white p-6 rounded shadow-lg" onSubmit={handleSubmit}>
				<h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>
				<input
					type="text"
					name="name"
					placeholder="Name"
					className="mb-4 p-2 border rounded w-full"
					value={formData.name}
					onChange={handleChange}
				/>
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
					Sign Up
				</button>
			</form>
		</div>
	);
}

export default Signup;