import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layoutをインポート
import Layout from './layouts/default';

// ページをインポート
import Home from './pages/Home';
import Todo from './pages/Todo';
import Signup from './pages/Signup';
import Login from './pages/Login';

const App = () => {
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route index element={<Home />} />
					<Route path="/todo" element={<Todo />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	);
};

export default App;
