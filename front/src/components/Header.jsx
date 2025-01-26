import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
	const { isLoggedIn, logout } = useAuth();

	return (
		<header className="bg-blue-500 text-white py-4">
			<div className="container mx-auto flex justify-between items-center">
				<h1 className="text-xl font-bold">Todo App</h1>
				<nav>
					<Link to="/" className="px-4 hover:underline">
						Home
					</Link>
					{isLoggedIn ? (
						<button onClick={logout} className="px-4 hover:underline">
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
