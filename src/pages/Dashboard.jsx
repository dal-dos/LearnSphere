import React, { useState, useEffect } from "react";
import { useProfile, usePosts } from "@/hooks";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import FormHeading from "@/components/FormHeading";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Dashboard() {
    const { profile } = useProfile();
    const { handleGetPostByUserId } = usePosts();
    const [recentComments, setRecentComments] = useState([]);
    const [userPosts, setUserPosts] = useState([]);

    // Fetch user's posts and extract recent comments if user is a teacher
    useEffect(() => {
        const fetchPosts = async () => {
            if (profile.role === "teacher") {
                const posts = await handleGetPostByUserId(profile.userId);
                setUserPosts(posts);
                const comments = posts.flatMap(post => post.comments || []).slice(0, 5); // Assuming each post has a 'comments' array
                setRecentComments(comments);
            }
        };
        fetchPosts();
    }, [profile, handleGetPostByUserId]);

    return (
        <div className="mx-auto max-w-4xl p-5">
            <FormHeading>Welcome to LearnSphere, {profile?.userId}!</FormHeading>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Conditionally render dashboard cards based on user role */}
                {profile.role !== "teacher" && (
                    <>
                        <Card className="rounded-lg p-6 text-center shadow">
                            <CardTitle>Your Courses</CardTitle>
                            <CardDescription>Resume learning where you left off.</CardDescription>
                            <Link to="/posts">
                                <Button className="mt-4">Go to Courses</Button>
                            </Link>
                        </Card>

                        <Card className="rounded-lg p-6 text-center shadow">
                            <CardTitle>Completed Courses</CardTitle>
                            <CardDescription>View the courses you've completed and access your certificates.</CardDescription>
                            
                        </Card>

                        <Card className="rounded-lg p-6 text-center shadow">
                        <CardTitle>Resources</CardTitle>
                        <CardDescription>Discover new courses, videos, and articles to further your education.</CardDescription>
                        <Link to="/posts">
                                <Button className="mt-4">Go to Resources</Button>
                            </Link>
                        </Card>
                    </>

                )}

            {/* Additional card for teachers to see recent comments */}
            {profile.role === "teacher" && (
                <>
                <Card className="rounded-lg p-6 text-center shadow col-span-2">
                <CardTitle>Recent Comments on Your Posts</CardTitle>
                {recentComments.length > 0 ? (
                    recentComments.map((comment, index) => (
                        <div key={index} className="mb-2">
                            <CardDescription>"{comment.text}" on <Link to={`/posts/${comment.postId}`}>{comment.postTitle}</Link></CardDescription>
                        </div>
                        ))
                    ) : (
                    <CardDescription>No recent comments.</CardDescription>
                )}
                </Card>

            {/* Card with button leading to user profile */}
            <Card className="rounded-lg p-6 text-center shadow">
                <CardTitle>View Your Teacher Profile</CardTitle>
                <CardDescription>Manage your profile settings and preferences.</CardDescription>
                <Link to="/profile">
                    <Button className="mt-4">Go to Profile & Posts</Button>
                 </Link>
            </Card>
            </>
        )}

                {/* Show calendar & deadlines for everyone */}
                <Card className="rounded-lg p-6 text-center shadow">
                    <CardTitle>Calendar & Deadlines</CardTitle>
                    <CardDescription>[Mini Calendar Here]</CardDescription>
                    <CardDescription>[List of Upcoming Deadlines]</CardDescription>
                </Card>
            </div>
        </div>
    );
}

export default Dashboard;
