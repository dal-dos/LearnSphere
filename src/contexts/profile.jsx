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
				console.log("getProfile() failed: ", data.message);
				return null;
			}
	
			return data.profile;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

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
            if (!response.ok) throw new Error('Failed to update profile');
            const data = await response.json();
            if (data.success) {
                setProfile(data.profile); 
            } else {
                throw new Error(data.message || "Profile update failed");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    return (
        <ProfileContext.Provider value={{ profile, handleUpdateProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};

export default ProfileProvider;
