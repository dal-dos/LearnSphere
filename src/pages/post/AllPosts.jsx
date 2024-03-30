import { usePosts, useAuth } from "@/hooks";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import FormHeading from "@/components/FormHeading";
import { Card, CardTitle, CardDescription, CardContent, CardHeader, CardFooter} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useProfile } from "@/hooks";
import { useNavigate } from 'react-router-dom';

function AllPostsPage() {
	
	const { posts } = usePosts();
    const { user } = useAuth();

	const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
	const { profile } = useProfile();
    const [hasPermissions, setPermissions] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const results = posts?.filter(
			(post) =>
				post?.postedBy?.toString().toLowerCase().includes(searchTerm) ||
				post?.description?.toString().toLowerCase().includes(searchTerm)
		);
		setSearchResults(results);

        setPermissions(user.role !== "student");
	}, [searchTerm, posts]);

	const addPost = () => {
		navigate('/posts/add');
	};
	  

	  return (
		<>
			<div className="min-h-screen">
				<div className="max-w-4xl mx-auto py-8 px-4">
					<FormHeading className="text-3xl font-bold text-center text-blue-800 mb-8">All Lectures</FormHeading>
					
					<div className="w-[90%] mx-auto">
					<div className="flex w-full items-center space-x-2">
                <Input
                    placeholder="Search Posts"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
				<Button onClick={addPost} disabled={!hasPermissions}>
							Create Post
				</Button>
				</div>
                <div className="flex flex-col gap-2 justify-center items-center mt-2">
                    {searchResults.length === 0 && (
                        <span className="text-center text-xl mt-10">No posts...</span>
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
        <Card className="w-full p-4 hover:bg-muted cursor-pointer">
            <Link to={`/posts/${post.postId}`} className="w-full">
                <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>{post.description}</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <div>
                        <CardDescription>Teacher: {post.postedBy}</CardDescription>
                    </div>
                    <div>
                        <CardDescription className="text-sm text-gray-500">{new Date(post.createdAt._seconds * 1000).toLocaleString()}</CardDescription>
                    </div>
                </CardFooter>
            </Link>
        </Card>
	);
}
export default AllPostsPage;
