import { useState, createContext, useEffect } from "react";

import { POSTS_BASE_URL } from "../constants";
import { CORS_CONFIG } from "../constants";

import { useAuth } from "@/hooks";

export const PostsContext = createContext({
	posts: [],
});
export default function PostsProvider({ children }) {
	const { isLoggedIn } = useAuth();

	const [posts, setPosts] = useState([]);

	useEffect(() => {
		if (!isLoggedIn) {
			return;
		}
		async function fetchPosts() {
			setPosts(await getPosts());
		}
		fetchPosts();
	}, [isLoggedIn]);

	return (
		<PostsContext.Provider value={{ posts }}>
			{children}
		</PostsContext.Provider>
	);
}

async function getPosts() {
	try {
		const response = await fetch(`${POSTS_BASE_URL}/posts`, {
			headers: {
				...CORS_CONFIG,
			},
		});

		if (!response) {
			console.log("No Response: While fetching posts");
			return [];
		}
		const data = await response.json();

		if (!data || data.success === false) {
			console.log(data.message);
			return [];
		}

		return data.posts;
	} catch (error) {
		console.log(error);
		return [];
	}
}
