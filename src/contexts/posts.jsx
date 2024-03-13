import { useState, createContext, useContext, useEffect } from "react";

import { POSTS_BASE_URL } from "../constants";
import { CORS_CONFIG } from "../constants";

const PostsContext = createContext();
export const usePosts = () => useContext(PostsContext);
export default function PostsProvider({ children }) {
	const [Posts, setPosts] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		setPosts(async () => await getPosts());
		setLoading(false);
	}, []);

	return (
		<PostsContext.Provider value={{ Posts, loading }}>
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
