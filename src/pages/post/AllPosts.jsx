// import { usePosts } from "../../hooks";

import { useEffect, useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import FormHeading from "@/components/FormHeading";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";

function AllPostsPage() {
	// const { posts } = usePosts();
	const posts = useMemo(
		() => [
			{
				postedBy: "696969696969",
				createdAt: {
					_seconds: 1710123553,
					_nanoseconds: 994000000,
				},
				image: "abcde.jpeg",
				comments: [],
				description:
					"This is a really good course. Based on Computing Systems.",
				postId: "41e3632f-1da8-44cc-b961-22b88ee96be7",
			},
			{
				postedBy: "44444444",
				createdAt: {
					_seconds: 1710123690,
					_nanoseconds: 377000000,
				},
				image: "xyiugfnoufnheriu.jpeg",
				comments: [],
				postId: "54c9bb64-d238-4ce6-8404-2b37cb2ef3db",
				description:
					"This is a really bad course. Based on Software Systems.",
			},
		],
		[]
	);

	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState(posts);

	useEffect(() => {
		const results = posts.filter(
			(post) =>
				post?.postedBy?.toLowerCase().includes(searchTerm) ||
				post?.description?.toLowerCase().includes(searchTerm)
		);
		setSearchResults(results);
	}, [searchTerm, posts]);

	return (
		<>
			<FormHeading>All Lectures</FormHeading>
			<div className="w-[90%] mx-auto">
				<Input
					placeholder="Search Posts"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<div className="flex flex-col gap-2 justify-center items-center mt-2">
					{searchResults.length === 0 && (
						<span className="text-center text-xl mt-10">
							No posts...
						</span>
					)}
					{searchResults.map((post) => (
						<PostPreview post={post} key={post.postId} />
					))}
				</div>
			</div>
		</>
	);
}

function PostPreview({ post }) {
	return (
		<Card className="w-full p-4 hover:bg-muted cursor-pointer">
			<Link to={`/posts/${post.postId}`} activeclassname="current">
				<CardTitle>{post.postedBy}</CardTitle>
				<CardDescription>{post.description}</CardDescription>
			</Link>
		</Card>
	);
}
export default AllPostsPage;
