// Posts.tsx
import React from "react";
import { Link } from "react-router-dom";
import "@/global.css";
import { usePosts } from "@/hooks";

const tempPost = [
	{
		postId: 1,
		title: "No Title",
		postedBy: "44444444",
		image: "https://via.placeholder.com/400x200",
		description: "This is a really bad course. Based on Software Systems.",
	},
	{
		postId: 2,
		title: "No Title",
		postedBy: "696969696969",
		image: "https://via.placeholder.com/400x200",
		description:
			"This is a really good course. Based on Computing Systems.",
	},
	// Add more posts as needed
];

function Posts() {
	const { Posts } = usePosts();

	if (Posts.length === 0) {
		return <h1>No Posts</h1>;
	}
	console.log("these are posts");
	console.log(Posts);

	return (
		<div className="lecture-posts">
			<div className="container">
				{tempPost.map((post) => (
					<Link
						to={`/lectures/${post.postId}`}
						key={post.postId}
						className="post-link"
					>
						<div className="post-card">
							<img
								className="post-image"
								src={post.image} //image
								alt={post.image} //image title {post.imageTitle}
							/>
							<div className="post-content">
								<h2>{post.title}</h2>
								<p>
									<strong>Author:</strong> {post.postedBy}
								</p>
								<p>{post.description}</p>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}

export default Posts;
