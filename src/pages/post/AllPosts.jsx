import { usePosts, useAuth } from "@/hooks";
import { useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { ProfileContext } from "@/contexts/profile";
import FormHeading from "@/components/FormHeading";
import {
	Card,
	CardTitle,
	CardDescription,
	CardContent,
	CardHeader,
	CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SquarePen } from "lucide-react";

function AllPostsPage() {
	const { posts } = usePosts();
	const { user } = useAuth();
	const { profile } = useContext(ProfileContext);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [hasPermissions, setPermissions] = useState(false);

	useEffect(() => {
		const results = posts
			?.filter(
				(post) =>
					post?.postedBy
						?.toString()
						.toLowerCase()
						.includes(searchTerm) ||
					post?.description
						?.toString()
						.toLowerCase()
						.includes(searchTerm)
			)
			.sort((a, b) => b.createdAt._seconds - a.createdAt._seconds); // This line adds the sorting logic

		setSearchResults(results);

		setPermissions(user.role !== "student");

		if (profile) {
			if(profile.role === "teacher"){
				const postsWithUserId = posts.filter(post => post.postedBy === profile.userId);
				profile.posts = postsWithUserId;
			}
		}
	}, [searchTerm, posts]);

	useEffect(() => {}, [posts]);

	return (
		<>
			<div className="min-h-screen">
				<div className="mx-auto max-w-4xl px-4 py-8">
					<FormHeading className="mb-8 text-center text-3xl font-bold text-blue-800">
						All Lectures
					</FormHeading>

					<div className="mx-auto w-[90%]">
						<div className="flex w-full items-center space-x-2">
							<Input
								placeholder="Search Posts"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
							<Button disabled={!hasPermissions} asChild>
								<Link to="/posts/add">
									<SquarePen />
								</Link>
							</Button>
						</div>
						<div className="mt-2 flex flex-col items-center justify-center gap-2">
							{searchResults.length === 0 && (
								<span className="mt-10 text-center text-xl">
									No posts...
								</span>
							)}
							{searchResults.map((post, index) => (
								<div key={index} className="w-full">
									<PostPreview post={post} />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

function PostPreview({ post }) {
	return (
		<Card className="w-full cursor-pointer p-4 hover:bg-muted">
			<Link to={`/posts/${post.postId}`} className="w-full">
				<CardHeader>
					<CardTitle>{post.title}</CardTitle>
				</CardHeader>
				<CardContent>
					<CardDescription>{post.description}</CardDescription>
				</CardContent>
				<CardFooter className="flex justify-between">
					<div>
						<CardDescription>{post.postedBy}</CardDescription>
					</div>
					<div>
						<CardDescription className="text-sm text-gray-500">
							{new Date(
								post.createdAt._seconds * 1000
							).toLocaleString()}
						</CardDescription>
					</div>
				</CardFooter>
			</Link>
		</Card>
	);
}
export default AllPostsPage;
