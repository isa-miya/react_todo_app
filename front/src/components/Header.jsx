import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Header() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_URL}/users/check-auth`, { withCredentials: true })
			.then((response) => {
				setIsLoggedIn(true);
			})
			.catch(() => {
				setIsLoggedIn(false);
				navigate('/login');
			});
	}, [navigate]);

	const handleLogout = () => {
		axios
			.post(`${process.env.REACT_APP_API_URL}/users/signout`, {}, { withCredentials: true })
			.then(() => {
				setIsLoggedIn(false);
				navigate('/login');
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<header className="bg-blue-500 text-white py-4">
			<div className="container mx-auto flex justify-between items-center">
				<h1 className="text-xl font-bold">Todo App</h1>
				<nav>
					<Link to="/" className="px-4 hover:underline">
						Home
					</Link>
					{isLoggedIn ? (
						<button onClick={handleLogout} className="px-4 hover:underline">
							Log Out
						</button>
					) : (
						<>
							<Link to="/signup" className="px-4 hover:underline">
								Sign Up
							</Link>
							<Link to="/login" className="px-4 hover:underline">
								Log In
							</Link>
						</>
					)}
				</nav>
			</div>
		</header>
	);
}

export default Header;
