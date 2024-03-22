//contexts/auth.jsx
import { createContext, useCallback, useEffect } from "react";
import { AUTH_BASE_URL } from "../constants";
import { useState } from "react";
import axios from "axios";

var initialState = {
	user: null,
	isLoggedIn: false,
	login: () => {},
	signup: () => {},
	refresh: () => {},
};

const axiosPrivate = axios.create({
	withCredentials: true,
});

export const AuthContext = createContext(initialState);

export default function AuthProvider({ children }) {
	const [user, setUser] = useState({
		role: null,
		username: null,
		accessToken: null,
	});

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const login = useCallback(async ({ username, password }) => {
		const res = await fetch(`${AUTH_BASE_URL}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=UTF-8",
				"Access-Control-Allow-Origin": "*",
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
				"Content-Type": "application/json;charset=UTF-8",
				"Access-Control-Allow-Origin": "*",
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

	const refresh = useCallback(async () => {
		try {
			const response = await axiosPrivate.get(`${AUTH_BASE_URL}/refresh`);

			const data = response.data;

			if (data.success) {
				setUser((user) => ({
					...user,
					accessToken: data.token,
				}));
				return data.token;
			}
		} catch (error) {
			console.log(error);
			return null;
		}
	}, []);

	useEffect(() => {
		const requestIntercept = axiosPrivate.interceptors.request.use(
			(config) => {
				if (!config.headers["Authorization"]) {
					config.headers[
						"Authorization"
					] = `Bearer ${user?.accessToken}`;
				}
				return config;
			},
			(error) => Promise.reject(error)
		);

		const responseIntercept = axiosPrivate.interceptors.response.use(
			(response) => response,
			async (error) => {
				const prevRequest = error?.config;
				if (error?.response?.status === 403 && !prevRequest?.sent) {
					prevRequest.sent = true;
					const newAccessToken = await refresh();
					prevRequest.headers[
						"Authorization"
					] = `Bearer ${newAccessToken}`;
					return axiosPrivate(prevRequest);
				}
				return Promise.reject(error);
			}
		);

		return () => {
			axiosPrivate.interceptors.request.eject(requestIntercept);
			axiosPrivate.interceptors.response.eject(responseIntercept);
		};
	}, [user, refresh]);

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
				secureAxios: axiosPrivate,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
