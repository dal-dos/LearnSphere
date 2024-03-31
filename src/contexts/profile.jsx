import React, { createContext, useState, useEffect, useCallback } from "react";
import { PROFILE_BASE_URL } from "../constants";
import { useAuth } from "@/hooks";

export const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
	const { isLoggedIn, getToken } = useAuth();
	const [profile, setProfile] = useState(null);

	useEffect(() => {
		if (!isLoggedIn) {
			return;
		}
		async function fetchProfile() {
			setProfile(await getProfile(`token=${getToken()}`));
		}

		fetchProfile();
		console.log("Profile is set to: ", profile);
	}, [isLoggedIn, getToken]);

	const getProfile = async (token) => {
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
				return null;
			}

			return data.profile;
		} catch (error) {
			console.error(error);
			return null;
		}
	};

	const handleUpdateProfile = async (userId, profileImg, biography, role) => {
		try {
			const response = await fetch(`${PROFILE_BASE_URL}/edit`, {
				method: "PUT",
				headers: {
					Authorization: `Bearer token=${getToken()}`,
					"Content-Type": "application/json;charset=UTF-8",
					"Access-Control-Allow-Origin": PROFILE_BASE_URL,
				},
				body: JSON.stringify({
					userId,
					profileImg,
					biography,
					role,
				}),
			});
			console.log(userId);
			if (!response.ok) throw new Error("Failed to update profile");
			const data = await response.json();
			if (data.success) {
				setProfile(data.profile);
				return data.profile;
			} else {
				throw new Error(data.message || "Profile update failed");
			}
		} catch (error) {
			console.error("Error updating profile:", error);
		}
	};

	const createProfile = async ({ name, username, role }) => {
		try {
			const response = await fetch(`${PROFILE_BASE_URL}/info`, {
				method: "POST",
				headers: {
					Authorization: `Bearer token=${getToken()}`,
					"Content-Type": "application/json;charset=UTF-8",
					"Access-Control-Allow-Origin": PROFILE_BASE_URL,
				},
				body: JSON.stringify({ name, username, role }),
			});

			const data = await response.json();

			if (data.success) {
				return {
					success: true,
					message: "Profile created!",
					user: data.user,
				};
			} else {
				return {
					success: false,
					message: "Couldn't reach profile service",
				};
			}
		} catch (error) {
			return {
				success: false,
				message: "Error during profile creation",
			};
		}
	};

	const handleGetProfileById = async (userId) => {
		try {
			const response = await fetch(`${PROFILE_BASE_URL}/info/${userId}`, {
				headers: {
					Authorization: `Bearer token=${getToken()}`,
					"Content-Type": "application/json;charset=UTF-8",
					"Access-Control-Allow-Origin": PROFILE_BASE_URL,
				},
			});

			if (!response.ok) {
				throw new Error("Failed to fetch profile");
			}
			const data = await response.json();
			if (!data || data.success === false) {
				throw new Error(data.message || "Profile fetch failed");
			}

			return data.profile;
		} catch (error) {
			console.error("Error fetching profile:", error);
			return null;
		}
	};

	return (
		<ProfileContext.Provider
			value={{
				profile,
				handleUpdateProfile,
				handleGetProfileById,
				createProfile,
			}}
		>
			{children}
		</ProfileContext.Provider>
	);
};

export default ProfileProvider;
