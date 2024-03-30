//contexts/auth.jsx
import { createContext, useCallback, useEffect } from "react";
import { AUTH_BASE_URL } from "../constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
var initialState = {
	user: null,
	isLoggedIn: false,
	login: () => {},
	signup: () => {},
	refresh: () => {},
};

export const AuthContext = createContext(initialState);

export default function AuthProvider({ children }) {
	const navigate = useNavigate();

	const [user, setUser] = useState({
		role: null,
		username: null,
	});

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const verifyToken = useCallback(async (t) => {
		try {
			const response = await fetch(`${AUTH_BASE_URL}/verify`, {
				method: "GET",
				headers: {
					"Access-Control-Allow-Origin": AUTH_BASE_URL,
					Authorization: `Bearer token=${t}`,
				},
			});

			return await response.json();
		} catch (error) {
			console.log(error);
			return null;
		}
	}, []);

	const login = useCallback(async ({ username, password }) => {
		try {
			const res = await fetch(`${AUTH_BASE_URL}/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json;charset=UTF-8",
					"Access-Control-Allow-Origin": AUTH_BASE_URL,
				},
				body: JSON.stringify({ username, password }), //username set here
			});

			if (res.status === 401) {
				return {
					success: false,
					message: "Invalid Credentials",
				};
			} else if (res.status === 404) {
				return {
					success: false,
					message: "Account does not exist",
				};
			} else if (res.ok === false) {
				return {
					success: false,
					message: "Server Error",
				};
			}

			const data = await res.json();

			if (data?.success) {
				setUser({ ...data.user });
				setIsLoggedIn(true);
				setTokenInStorage(data.token);

				return {
					success: true,
					message: "Login successful", //if success send to profilecontext
				};
			} else {
				return {
					success: false,
					message: "Some error occurred. Please try again later.",
				};
			}
		} catch (error) {
			console.log(error);
			return {
				success: false,
				message: "Invalid Credentials or Account does not exist",
			};
		}
	}, []);

	const signup = useCallback(async ({ username, password, role }) => {
		try {
			const res = await fetch(`${AUTH_BASE_URL}/signup`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json;charset=UTF-8",
					"Access-Control-Allow-Origin": "*",
				},
				body: JSON.stringify({ username, password, role }),
			});

			const data = await res.json();

			if (data.success) {
				setUser({ ...data.user });
				setIsLoggedIn(true);
				setTokenInStorage(data.token);

				return {
					success: true,
					message: "Signup successful",
				};
			}

			throw new Error(data.message);
		} catch (error) {
			console.error("Error during signup:", error);
			return {
				success: false,
				message: data.message || "An error occurred during signup.",
			};
		}
	}, []);

	const signout = useCallback(() => {
		setUser(null);
		setIsLoggedIn(false);
		deleteTokenInStorage();
		navigate("/");
	}, []);

	// const refresh = useCallback(async () => {
	// 	try {
	// 		const response = await axiosPrivate.get(`${AUTH_BASE_URL}/refresh`);

	// 		const data = response.data;

	// 		if (data.success) {
	// 			setUser((user) => ({
	// 				...user,
	// 				token: data.token,
	// 			}));
	// 			return data.token;
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 		return null;
	// 	}
	// }, []);

	useEffect(() => {
		const v = async () => {
			const t = getTokenFromStorage();
			if (t) {
				const res = await verifyToken(t);

				if (res?.success) {
					setIsLoggedIn(() => true);
					setUser(() => ({ ...res?.user }));
					// navigate();
				}
			}
		};
		v();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				isLoggedIn,
				login,
				signup,
				signout,
				getToken: getTokenFromStorage,
				verifyToken,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

function getTokenFromStorage(name = "jwt") {
	return localStorage.getItem(name);
}
function setTokenInStorage(token, name = "jwt") {
	localStorage.setItem(name, token);
}
function deleteTokenInStorage(name = "jwt") {
	localStorage.removeItem(name);
}
