import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layoutをインポート
import Layout from './layouts/default';
// AuthProviderをインポート
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute } from './context/PrivateRoute';

// ページをインポート
import Home from './pages/Home';
import Todo from './pages/Todo';
import Signup from './pages/Signup';
import Login from './pages/Login';

const App = () => {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Layout>
					<Routes>
						<Route index element={<Home />} />
						<Route
							path="/todo"
							element={
								<PrivateRoute>
									<Todo />
								</PrivateRoute>
							}
						/>
						<Route path="/signup" element={<Signup />} />
						<Route path="/login" element={<Login />} />
					</Routes>
				</Layout>
			</BrowserRouter>
		</AuthProvider>
	);
};

export default App;
