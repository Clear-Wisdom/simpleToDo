import React, { useState } from "react";

const Login = ({ user, setUser }) => {
	const [username, setUsername] = useState("");

	const handleLogin = () => {
		setUser(username);
	};

	return (
		<div className="flex flex-col justify-center items-center">
			{user ? (
				<div className="text-center">
					<h2 className="text-2xl mb-4">Welcome, {user}!</h2>
					<button
						onClick={() => setUser(null)}
						className="mt-1 bg-red-400 text-white px-2 py-1 rounded hover:bg-red-500"
					>
						Logout
					</button>
				</div>
			) : (
				<div className="flex flex-col items-center">
					<input
						type="text"
						placeholder="Enter username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="border border-gray-300 rounded px-2 py-1 mb-2"
					/>
					<button
						onClick={handleLogin}
						className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
					>
						Login
					</button>
				</div>
			)}
		</div>
	);
};

export default Login;
