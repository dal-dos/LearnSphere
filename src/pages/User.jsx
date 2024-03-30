import React, { useState, useEffect } from 'react';
import { usePosts, useAuth } from "@/hooks"; 
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useProfile } from '@/hooks';

function User() {
    const { handleGetPostByUserId } = usePosts(); 
    const [userProfile, setProfile] = useState(null); 
    const [userPosts, setUserPosts] = useState([]);
    const { user } = useAuth(); 
    const [imageExists, setImageExists] = useState(false);
    const { userId } = useParams();
    const { handleGetProfileById } = useProfile(); 

    useEffect(() => {
        async function fetchData() {
            try {
                const fetchedProfile = await handleGetProfileById(userId);
                setProfile(fetchedProfile);

                if(userId.role == "teacher"){
                    const posts = await handleGetPostByUserId(userId); 
                    setUserPosts(posts);    
                }

                const isValid = await isValidImage(fetchedProfile.profileImg);
                setImageExists(isValid);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, [userId]); 

    async function isValidImage(src) {
        return new Promise(resolve => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = src; 
        });
    }

    return (
        <div className="max-w-4xl mx-auto p-5">
            {!userProfile ? (
                <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin" /></div>
            ) : (
                <>
                    <Card className="shadow rounded-lg p-6 text-center">
                        <div className="mx-auto">
                            <div className="flex justify-center">
                                <div className="w-32 h-32">
                                    {imageExists ? (
                                        <img src={userProfile.profileImg} alt="Profile Image" className="rounded-full w-full h-full object-cover" />
                                    ) : (
                                        <img src="/assets/defaultuser.png" alt="Default Profile Image" className="rounded-full w-full h-full object-cover" />
                                    )}
                                </div>
                            </div>
                            <CardTitle className="text-lg font-semibold mt-2">{userProfile.userId}</CardTitle>
                            <CardDescription>{userProfile.role}</CardDescription>
                            <CardDescription>{userProfile.biography}</CardDescription>
                        </div>
                    </Card>
                    
                    {userId.role === "teacher" && (
                        <section className="mt-10">
                            <h2 className="text-xl font-semibold mb-4">{userProfile.userId}'s Posts</h2>
                            {!userPosts ? (
                                <div className="flex justify-center items-center h-screen">
                                    <Loader2 className="animate-spin" />
                                </div>
                            ) : (
                                userPosts.length > 0 ? (
                                    userPosts.map((post) => (
                                        <Link key={post.postId} to={`/posts/${post.postId}`} className="w-full">
                                            <Card className="shadow rounded-lg p-4 mb-6 hover:bg-muted">
                                                <CardTitle className="text-lg font-semibold">{post.title}</CardTitle>
                                                <CardDescription className="text-gray-600">{post.description}</CardDescription>
                                            </Card>
                                        </Link>
                                    ))
                                ) : (
                                    <p className="text-gray-600">No posts found.</p>
                                )
                            )}
                        </section>
                    )}
                </>
            )}
        </div>
    );
}

export default User;
