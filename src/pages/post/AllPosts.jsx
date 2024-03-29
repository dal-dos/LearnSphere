import { usePosts } from "@/hooks";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import FormHeading from "@/components/FormHeading";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useProfile } from "@/hooks";
import { useNavigate } from 'react-router-dom';

function AllPostsPage() {
	
  	const { posts, handleCreatePost } = usePosts(); 

	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState([posts]);
	const { profile } = useProfile();

	const navigate = useNavigate();

	useEffect(() => {
		const results = posts?.filter(
			(post) =>
				post?.postedBy?.toLowerCase().includes(searchTerm) ||
				post?.description?.toLowerCase().includes(searchTerm)
		);
		setSearchResults(results);
	}, [searchTerm, posts]);

	const addPost = () => {
		navigate('/posts/add');
	};
	  

	  return (
		<>
			<div className="min-h-screen">
				<div className="max-w-4xl mx-auto py-8 px-4">
					<FormHeading className="text-3xl font-bold text-center text-blue-800 mb-8">All Lectures</FormHeading>
					
					<div className="flex justify-center mb-6">
						<Button onClick={addPost} className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition ease-in-out duration-150">
							Create Post
						</Button>
					</div>
					
					<div className="mb-6">
						<Input
							placeholder="Search Posts"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full p-4 rounded border-2 border-blue-300 focus:border-blue-500 transition ease-in-out duration-150"
						/>
					</div>
					
					<div className="space-y-4">
						{searchResults.length === 0 ? (
							<span className="text-center text-xl mt-10 block text-blue-800">
								No posts found...
							</span>
						) : (
							searchResults.map((post, index) => (
								<div key={index} className="bg-blue-50 rounded-lg shadow p-2">
									<PostPreview post={post} />
								</div>
							))
						)}
					</div>
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
