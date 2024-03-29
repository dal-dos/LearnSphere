//contexts/profile.jsx
import { useEffect, useState } from "react";
import { PROFILE_BASE_URL } from "../constants";

import { createContext } from "react";
import { useAuth } from "@/hooks";

export const ProfileContext = createContext({
	username: null,
	img: "",
});

export default function ProfileProvider({ children }) {
	const [profile, setProfile] = useState({});

	const { isLoggedIn, getToken } = useAuth();

	useEffect(() => {
		if (!isLoggedIn) {
			return;
		}
		async function fetchProfile() {
			setProfile(await getProfile(`token=${getToken()}`));
		}
		fetchProfile();
	}, [isLoggedIn, getToken]);

	return (
		<ProfileContext.Provider
			value={{
				profile,
			}}
		>
			{children}
		</ProfileContext.Provider>
	);
}

async function getProfile(token) {
	try {
		const response = await fetch(`${PROFILE_BASE_URL}/info`, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json;charset=UTF-8",
				"Access-Control-Allow-Origin": "*",
			},
		});

		if (!response.ok) {
			return null;
		}
		const data = await response.json();

		if (!data || data.success === false) {
			console.log("getProfile() failed: ", data.message);
			return null;
		}

		return data.profile;
	} catch (error) {
		console.error(error);
		return null;
	}
}
