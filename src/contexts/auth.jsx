//contexts/auth.jsx
import { createContext, useContext } from "react";
import { AUTH_BASE_URL, CORS_CONFIG } from "../constants";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
	async function login({ username, password }) {
		const res = await fetch(`${AUTH_BASE_URL}/login`, {
			method: "POST",
			headers: {
				...CORS_CONFIG,
			},
			body: JSON.stringify({ username, password }), //username set here
		});

		const data = await res.json();

		if (data?.success) {
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
	}
	async function signup({ username, password, role }) {
		const res = await fetch(`${AUTH_BASE_URL}/signup`, {
			method: "POST",
			headers: {
				...CORS_CONFIG,
			},
			body: JSON.stringify({ username, password, role }),
		});

		const data = await res.json();

		if (data?.success) {
			return {
				success: true,
				message: "Signup successful",
			};
		} else {
			return {
				success: false,
				message: "Invalid username or password",
			};
		}
	}
	return (
		<AuthContext.Provider value={{ login, signup }}>
			{children}
		</AuthContext.Provider>
	);
}
