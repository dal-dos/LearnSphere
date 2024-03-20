//contexts/auth.jsx
import { createContext, useCallback } from "react";
import { AUTH_BASE_URL, CORS_CONFIG } from "../constants";
import { useState } from "react";

var initialState = {
	user: null,
	isLoggedIn: false,
	login: () => {},
	signup: () => {},
};

export const AuthContext = createContext(initialState);

export default function AuthProvider({ children }) {
	const [user, setUser] = useState({
		role: null,
		username: null,
	});

	const [isLoggedIn, setIsLoggedIn] = useState(true);

	const login = useCallback(async ({ username, password }) => {
		const res = await fetch(`${AUTH_BASE_URL}/login`, {
			method: "POST",
			headers: {
				...CORS_CONFIG,
			},
			body: JSON.stringify({ username, password }), //username set here
		});

		const data = await res.json();

		if (data?.success) {
			setUser(data?.user);
			setIsLoggedIn(true);
			return {
				success: true,
				message: "Login successful", //if success send to profilecontext
			};
		} else {
			return {
				success: false,
				message: "Invalid username or password",
			};
		}
	}, []);
	const signup = useCallback(async ({ username, password, role }) => {
		const res = await fetch(`${AUTH_BASE_URL}/signup`, {
			method: "POST",
			headers: {
				...CORS_CONFIG,
			},
			body: JSON.stringify({ username, password, role }),
		});

		const data = await res.json();

		if (data?.success) {
			setUser(data?.user);
			setIsLoggedIn(true);
			return {
				success: true,
				message: "Signup successful",
			};
		} else {
			return {
				success: false,
				message: data.message,
			};
		}
	}, []);

	console.log("values", {
		user,
		isLoggedIn,
		login,
		signup,
	});

	return (
		<AuthContext.Provider
			value={{
				user,
				isLoggedIn,
				login,
				signup,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
