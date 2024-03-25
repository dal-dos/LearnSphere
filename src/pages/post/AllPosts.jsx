import { usePosts } from "../../hooks";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import FormHeading from "@/components/FormHeading";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";

function AllPostsPage() {
	const { posts } = usePosts();

	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([posts]);

	useEffect(() => {
		const results = posts?.filter(
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
					{searchResults.map((post, index) => (
						<div key={index}>
							<PostPreview post={post} key={index} />
						</div>
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
