import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { usePosts } from "@/hooks";
import { useAuth } from "@/hooks";
import {
	Card,
	CardTitle,
	CardDescription,
	CardContent,
	CardHeader,
} from "@/components/ui/card";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2, Pencil, SendHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

function Post() {
	const { postSlug } = useParams();
	const navigate = useNavigate();
	const { toast } = useToast();
	const {
		getPostById,
		handleDeletePost,
		handleAddComment,
		handleDeleteComment,
		posts,
	} = usePosts();
	const { user } = useAuth();
	const [post, setPost] = useState(null);
	const [comment, setComment] = useState("");
	const [editPermission, setEditPermission] = useState(false);

	useEffect(() => {
		async function fetchPost() {
			let fetchedPost;
			const foundPost = posts.find((post) => post.postId === postSlug);
			if (foundPost) {
				fetchedPost = foundPost;
			} else {
				// When opening a post not fetched on all lectures page
				fetchedPost = await getPostById(postSlug);
			}

			if (!fetchedPost) {
				return;
			}
			setPost(fetchedPost);
			if (
				(user.role === "teacher" &&
					user.username === fetchedPost.postedBy) ||
				user.role === "admin"
			) {
				setEditPermission(true);
			}
		}
		fetchPost();
	}, [getPostById, postSlug]);

	function getVideoId(post) {
		const youtubeRegex =
			/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
		const match = post.lectureURL.match(youtubeRegex);
		if (match) {
			return match[1];
		} else return null;
	}

	const deletePost = async () => {
		try {
			await handleDeletePost(post.postId, posts);
			toast({
				title: "Post deleted successfully",
			});
			await navigate("/posts"); // Await navigation after deletion
		} catch (error) {
			console.error("Error deleting post:", error);
			toast({
				variant: "destructive",
				title: "Failed to delete post",
				description:
					"An error occurred while trying to delete the post.",
			});
		}
	};

	const submitComment = async () => {
		if (comment.trim()) {
			try {
				const res = await handleAddComment(post.postId, comment);

				if (!res.success) {
					throw new Error(res.message);
				}

				setComment("");
				setPost((prevPost) => ({
					...prevPost,
					comments: [...prevPost.comments, res.comment],
				}));
			} catch (error) {
				console.error("Error adding comment:", error);
				toast({
					variant: "destructive",
					title: "Failed to add comment",
					description:
						"An error occurred while trying to add the comment.",
				});
			}
		}
	};

	if (!post) {
		return (
			<div className="flex h-screen items-center justify-center">
				<Loader2 className="animate-spin" />
			</div>
		);
	}

	return (
		<Card className="mx-auto max-w-4xl rounded-lg p-4 shadow-md">
			<CardHeader>
				<CardTitle className="mb-6 text-center text-3xl font-semibold">
					{post.title}
				</CardTitle>

				<CardDescription className="text-center">
					{post.postedBy === user.username ? (
						<Link to="/profile">By: {post.postedBy}</Link>
					) : (
						<Link to={`/users/${post.postedBy}`}>
							By: {post.postedBy}
						</Link>
					)}
				</CardDescription>
			</CardHeader>
			<CardContent className="mb-6 mt-6">
				{post?.image && (
					<img src={post.image} alt="Thumbnail" className="mb-4" />
				)}

				<CardDescription className="mb-4 text-lg">
					{post.description}
				</CardDescription>

				{post?.lectureURL && ( // Render YouTube video if valid ID exists
					<div className="mb-4">
						<iframe
							width="100%"
							height="400"
							src={`https://www.youtube.com/embed/${getVideoId(post)}`}
							title="YouTube video player"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						></iframe>
					</div>
				)}

				<CardDescription className="mt-4">
					{new Date(post.createdAt._seconds * 1000).toLocaleString()}
				</CardDescription>
			</CardContent>
			<CardContent>
				<Label className="mb-3 text-xl font-bold">Comments</Label>

				{post?.comments?.map((comm, index) => (
					<div
						key={index}
						className="group relative mb-4 flex flex-col space-y-4 rounded-sm p-2 hover:bg-muted"
					>
						<div className="flex justify-between">
							<span className="text-sm font-bold">
								{user.username === comm.author ? (
									<Link to="/profile">@{comm.author}</Link>
								) : (
									<Link to={`/users/${comm.author}`}>
										@{comm.author}
									</Link>
								)}
							</span>
							<span className="text-sm">
								{comm &&
									new Date(
										comm?.createdAt._seconds * 1000
									).toLocaleString()}
							</span>
						</div>
						<div className="relative flex items-center space-x-2">
							<div className="w-full">{comm.comment}</div>

							{(user.role === "admin" ||
								user.username === comm.author) && (
								<Button
									onClick={() =>
										handleDeleteComment(
											post.postId,
											comm.id
										)
									}
									size="icon"
									variant="ghost"
									className="absolute bottom-0 right-0 hidden cursor-pointer text-sm group-hover:block"
								>
									<Trash2 color="red" />
								</Button>
							)}
						</div>
					</div>
				))}

				<div className="flex w-full items-center space-x-2">
					<Input
						type="text"
						placeholder="Write a comment..."
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								submitComment();
							}
						}}
						className="w-full"
					/>
					<Button onClick={submitComment}>
						<SendHorizontal />
					</Button>
				</div>
			</CardContent>
			{editPermission && (
				<div className="flex items-center justify-end gap-2 p-4">
					<Link to={`/posts/${post.postId}/edit`}>
						<Button variant="secondary">
							<Pencil />
						</Button>
					</Link>
					{/* <Button onClick={deletePost} variant="destructive">
						<Trash2 variant="destructive" />
					</Button> */}
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button variant="destructive">
								<Trash2 variant="destructive" />
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>
									Are you absolutely sure?
								</AlertDialogTitle>
								<AlertDialogDescription>
									This action cannot be undone. This will
									permanently delete this post and remove the
									data from our servers.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<AlertDialogAction
									onClick={deletePost}
									variant="destructive"
									style={{ backgroundColor: "red" }}
								>
									Continue
								</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</div>
			)}
		</Card>
	);
}

export default Post;
