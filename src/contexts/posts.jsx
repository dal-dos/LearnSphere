import { useState, createContext, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks";
import { POSTS_BASE_URL } from "../constants";
import { useProfile } from "@/hooks";
import { useToast } from "@/components/ui/use-toast";
export const PostsContext = createContext({
	posts: [],
	userPosts: [],
	handleAddComment: async () => {},
	handleDeletePost: async () => {},
	handleDeleteComment: async () => {},
	handleCreatePost: async () => {},
	handleUpdatePost: async () => {},
	getPostById: async () => {},
	handleGetPostByUserId: async () => {},
});

export default function PostsProvider({ children }) {
	const { isLoggedIn, getToken, user } = useAuth();
	const [posts, setPosts] = useState([]);
	const [userPosts, setUserPosts] = useState([]);
	const { profile } = useProfile();

	const { toast } = useToast();

	useEffect(() => {
		if (!isLoggedIn) {
			return;
		}
		async function fetchPosts() {
			// getAllPosts
			setPosts(await getPosts());
			const response = await handleGetPostByUserId(user.username);
			if (response.success) {
				setUserPosts(response.post);
			} else {
				toast({
					title: "Error fetching posts",
					description: response.message,
					variant: "destructive",
				});
			}
		}
		fetchPosts();
	}, [isLoggedIn, getToken]);

	// POST RELATED FUNCTIONS ---------------------------------------------
	const getPosts = useCallback(async () => {
		try {
			const response = await fetch(`${POSTS_BASE_URL}/posts`, {
				headers: {
					Authorization: `Bearer token=${getToken()}`,
					"Content-Type": "application/json;charset=UTF-8",
					"Access-Control-Allow-Origin": POSTS_BASE_URL,
				},
			});

			if (!response.ok) {
				console.error("Failed to fetch posts");
				return [];
			}

			const data = await response.json();
			console.log(data.post);
			if (data.post && profile) {
				console.log("hi");
				if (profile.role === "teacher") {
					const postsWithUserId = posts.filter(
						(post) => post.postedBy === profile.userId
					);
					profile.posts = postsWithUserId;
				}
			}
			return data.post;
		} catch (error) {
			console.error("Error fetching posts:", error);
			return [];
		}
	}, []);

	const getPostById = useCallback(async (postId) => {
		try {
			const response = await fetch(`${POSTS_BASE_URL}/posts/${postId}`, {
				headers: {
					Authorization: `Bearer token=${getToken()}`,
					"Content-Type": "application/json;charset=UTF-8",
					"Access-Control-Allow-Origin": POSTS_BASE_URL,
				},
			});
			const data = await response.json();
			if (response.ok) {
				return data.post;
			} else {
				console.error("Failed to fetch post", data.message);
			}
		} catch (error) {
			console.error("Error fetching post:", error);
		}
	}, []);

	const handleCreatePost = useCallback(
		async ({ userId, title, description, image, lectureURL }) => {
			try {
				const response = await fetch(`${POSTS_BASE_URL}/posts/create`, {
					method: "POST",
					headers: {
						Authorization: `Bearer token=${getToken()}`,
						"Content-Type": "application/json;charset=UTF-8",
						"Access-Control-Allow-Origin": POSTS_BASE_URL,
					},
					body: JSON.stringify({
						userId,
						title,
						description,
						image,
						lectureURL,
					}),
				});

				const data = await response.json();

				if (data.success) {
					setPosts((posts) => [data.post, ...posts]);
					return {
						success: true,
						message: "",
						post: data.post,
					};
				} else {
					console.error("Failed to create post:", data.message);
					return { success: false, message: data.message };
				}
			} catch (error) {
				console.error("Error creating post:", error);
			}
		},
		[posts, userPosts]
	);

	const handleUpdatePost = useCallback(
		async (postId, { title, description, image, lectureURL }) => {
			try {
				const response = await fetch(
					`${POSTS_BASE_URL}/posts/update/${postId}`,
					{
						method: "PUT",
						headers: {
							Authorization: `Bearer token=${getToken()}`,
							"Content-Type": "application/json;charset=UTF-8",
							"Access-Control-Allow-Origin": POSTS_BASE_URL,
						},
						body: JSON.stringify({
							title,
							description,
							image,
							lectureURL,
						}),
					}
				);
				const data = await response.json();

				if (data.success) {
					setPosts((posts) => [data.post, ...posts]);
					return {
						success: true,
						message: data.message,
						post: data.post,
					};
				} else {
					console.error("Failed to update post:", data.message);
					return { success: false, message: data.message };
				}
			} catch (error) {
				console.error("Error updating post:", error);
			}
		},
		[posts, userPosts]
	);

	const handleGetPostByUserId = useCallback(
		async (userId) => {
			// user in the params is the one whos posts will be returned
			// user in the auth header is the one who is making the request
			// otherwise you are allowed to fetch the posts

			try {
				const response = await fetch(
					`${POSTS_BASE_URL}/posts/user/${userId}`,
					{
						headers: {
							Authorization: `Bearer token=${getToken()}`,
							"Content-Type": "application/json;charset=UTF-8",
							"Access-Control-Allow-Origin": POSTS_BASE_URL,
						},
					}
				);
				const data = await response.json();

				if (data.success) {
					return {
						success: true,
						message: "",
						post: data.post,
					};
				} else {
					console.error(
						"Failed to fetch posts by user ID:",
						data.message
					);
					return {
						success: false,
						message: data.message,
					};
				}
			} catch (error) {
				console.error("Error fetching posts by user ID:", error);
				return {
					success: false,
					message: "Error fetching posts",
				};
			}
		},
		[posts, userPosts]
	);

	// COMMENT RELATED FUNCTIONS ---------------------------------------------

	const handleAddComment = useCallback(
		async (postId, commentText) => {
			try {
				const response = await fetch(
					`${POSTS_BASE_URL}/posts/${postId}/addcomment`,
					{
						method: "POST",
						headers: {
							Authorization: `Bearer token=${getToken()}`,
							"Content-Type": "application/json;charset=UTF-8",
							"Access-Control-Allow-Origin": POSTS_BASE_URL,
						},
						body: JSON.stringify({
							userId: user.username,
							comment: commentText,
						}),
					}
				);
				const data = await response.json();

				if (data.success) {
					setPosts((posts) => {
						const updatedPosts = posts.map((post) => {
							if (post.postId === postId) {
								return post.comments.push(data.comment);
							}
							return post;
						});
						return updatedPosts;
					});
					setUserPosts((posts) => {
						const updatedPosts = posts.map((post) => {
							if (post.postId === postId) {
								return post.comments.push(data.comment);
							}
							return post;
						});
						return updatedPosts;
					});

					return {
						success: true,
						message: data.message,
						comment: data.comment,
					};
				}
			} catch (error) {
				console.error("Error adding comment:", error);
				return { success: false, message: error.message };
			}
		},
		[posts, userPosts]
	);

	const handleDeletePost = useCallback(async (postId, savedPosts) => {
		try {
			const response = await fetch(
				`${POSTS_BASE_URL}/posts/delete/${postId}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer token=${getToken()}`,
						"Content-Type": "application/json;charset=UTF-8",
						"Access-Control-Allow-Origin": POSTS_BASE_URL,
					},
				}
			);
			console.log(posts);
			const data = await response.json();
			console.log("Delete Post Response:", data);
			if (data.success) {
				const newPosts = savedPosts.filter(
					(post) => post.postId !== postId
				);
				setPosts(newPosts);
				return { success: true, post: newPosts };
			} else {
				console.error("Failed to create post:", data.message);
				return { success: false, message: data.message };
			}
		} catch (error) {
			console.error("Error deleting post:", error);
		}
	}, []);

	const handleDeleteComment = useCallback(
		async (postId, commentId) => {
			try {
				const response = await fetch(
					`${POSTS_BASE_URL}/posts/${postId}/comments/${commentId}/delete`,
					{
						method: "DELETE",
						headers: {
							Authorization: `Bearer token=${getToken()}`,
							"Content-Type": "application/json;charset=UTF-8",
							"Access-Control-Allow-Origin": POSTS_BASE_URL,
						},
					}
				);
				const data = await response.json();
				console.log("Delete Comment Response:", data);

				if (response.ok) {
					setPosts((posts) =>
						posts.map((post) => {
							if (post.id === postId) {
								const updatedComments = post.comments.filter(
									(comment) => comment.id !== commentId
								);
								return { ...post, comments: updatedComments };
							}
							return post;
						})
					);
				} else {
					console.error("Failed to delete comment:", data.message);
				}
			} catch (error) {
				console.error("Error deleting comment:", error);
			}
		},
		[posts, userPosts]
	);

	return (
		<PostsContext.Provider
			value={{
				posts,
				userPosts,
				getPostById,
				handleAddComment,
				handleDeletePost,
				handleDeleteComment,
				handleCreatePost,
				handleUpdatePost,
				handleGetPostByUserId,
			}}
		>
			{children}
		</PostsContext.Provider>
	);
}
