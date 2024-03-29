import { usePosts } from "../../hooks";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import FormHeading from "@/components/FormHeading";
import { Card, CardTitle, CardDescription, CardContent, CardHeader, CardFooter} from "@/components/ui/card";
import { Link } from "react-router-dom";

function AllPostsPage() {
    const { posts } = usePosts();

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const results = posts.filter(
            (post) =>
                post.postedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.description.toLowerCase().includes(searchTerm.toLowerCase())
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
                        <span className="text-center text-xl mt-10">No posts...</span>
                    )}
                    {searchResults.map((post, index) => (
                        <div key={index} className="w-full">
                            <PostPreview post={post} />
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
            <Link to={`/posts/${post.postId}`} className="w-full" activeClassName="current">
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

