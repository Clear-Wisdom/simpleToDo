import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
	const [user, setUser] = useState(null);

	const handleSuccess = (credentialResponse) => {
		console.log("Credential Response:", credentialResponse);
		if (credentialResponse.credential) {
			const decoded = jwtDecode(credentialResponse.credential);
			console.log("Decoded JWT:", decoded);
			setUser(decoded);
		}
	};

	const handleError = () => {
		console.log("Login Failed");
	};

	const handleLogout = () => {
		setUser(null);
	};

	return (
		<div className="flex justify-center items-center">
			{user ? (
				<div className="text-center">
					<h2 className="text-2xl mb-4">Welcome, {user.given_name}</h2>
					<button
						onClick={handleLogout}
						className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
					>
						Logout
					</button>
				</div>
			) : (
				<GoogleLogin onSuccess={handleSuccess} onError={handleError} />
			)}
		</div>
	);
};

export default Login;
