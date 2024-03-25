import { useState, createContext, useEffect } from "react";

import { POSTS_BASE_URL } from "../constants";

import { useAuth } from "@/hooks";

export const PostsContext = createContext({
	posts: [],
});
export default function PostsProvider({ children }) {
	const { isLoggedIn, getToken } = useAuth();

	const [posts, setPosts] = useState([]);

	useEffect(() => {
		if (!isLoggedIn) {
			return;
		}
		async function fetchPosts() {
			setPosts(await getPosts(`token=${getToken()}`));
		}
		fetchPosts();
	}, [isLoggedIn, getToken]);

	return (
		<PostsContext.Provider value={{ posts }}>
			{children}
		</PostsContext.Provider>
	);
}

async function getPosts(token) {
	try {
		const response = await fetch(`${POSTS_BASE_URL}/posts`, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json;charset=UTF-8",
				"Access-Control-Allow-Origin": POSTS_BASE_URL,
			},
		});

		if (!response) {
			console.log("No Response: While fetching posts");
			return [];
		}
		const data = await response.json();

		if (!data || data.success === false) {
			console.log("getPosts() failed: ", data.message);
			return [];
		}

		return data;
	} catch (error) {
		console.log(error);
		return [];
	}
}
