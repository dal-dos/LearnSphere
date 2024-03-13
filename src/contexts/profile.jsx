import { useEffect, useState } from "react";
import { AUTH_BASE_URL, CORS_CONFIG, PROFILE_BASE_URL } from "../constants";

import { createContext, useContext } from "react";

const ProfileContext = createContext();
export const useProfile = () => useContext(ProfileContext);

export default function ProfileProvider({ children }) {
	const [user, setUser] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [Profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		setUser(async () => await getUser());
		if (user) {
			setIsLoggedIn(true);
		}
		setProfile(async () => await getProfile());
		setLoading(false);
	}, []);

	return (
		<ProfileContext.Provider
			value={{
				user,
				Profile,
				loading,
				isLoggedIn,
				setIsLoggedIn,
				setUser,
				getUser,
			}}
		>
			{children}
		</ProfileContext.Provider>
	);
}
async function getUser() {
	try {
		// TODO: make a different URL as /verify returns the password as well
		// TODO: it is a security risk
		const response = await fetch(`${AUTH_BASE_URL}/verify`, {
			headers: {
				...CORS_CONFIG,
			},
		});

		if (!response) {
			return null;
		}
		const data = await response.json();
		console.log("cookies", data.header.cookies);

		if (!data || data.success === false) {
			console.log(data.message);
			return null;
		}

		return data.user;
	} catch (error) {
		console.error(error);
		return null;
	}
}
async function getProfile() {
	try {
		const response = await fetch(`${PROFILE_BASE_URL}/info`, {
			headers: {
				...CORS_CONFIG,
			},
			credentials: "include",
		});

		if (!response) {
			return null;
		}
		const data = await response.json();

		if (!data || data.success === false) {
			console.log(data.message);
			return null;
		}

		return data.user;
	} catch (error) {
		console.error(error);
		return null;
	}
}
