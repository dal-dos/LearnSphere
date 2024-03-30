import React, { createContext, useState, useEffect } from "react";
import { PROFILE_BASE_URL } from "../constants";
import { useAuth, usePosts } from "@/hooks";

export const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
    const { isLoggedIn, getToken } = useAuth();
    const { handleGetPostByUserId } = usePosts();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
		if (!isLoggedIn) {
			return;
		}
		async function fetchProfile() {
            const tempProfile =await getProfile(`token=${getToken()}`)
            const posts =await handleGetPostByUserId(tempProfile.userId);
			setProfile(tempProfile);
            
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
                throw new Error('Failed to fetch profile');
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
        <ProfileContext.Provider value={{ profile, handleUpdateProfile, handleGetProfileById }}>
            {children}
        </ProfileContext.Provider>
    );
};

export default ProfileProvider;
