import React, { useContext, useState, useEffect } from 'react';
import { ProfileContext } from '@/contexts/profile';
import FormHeading from "@/components/FormHeading";
import { usePosts, useAuth } from "@/hooks"; 
import { Card, CardTitle, CardDescription, CardContent, CardHeader, CardFooter} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from '@radix-ui/react-dropdown-menu';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

function Profile() {
    const { profile, handleUpdateProfile } = useContext(ProfileContext);
    const { handleGetPostByUserId } = usePosts(); 
    const [isEditing, setIsEditing] = useState(false);
    const [editProfile, setEditProfile] = useState({
        userId: '',
        profileImg: '',
        biography: '',
        role: '',
    });
    const [userPosts, setUserPosts] = useState([]);

	const { user } = useAuth(); 
    const [imageExists, setImageExists] = useState(false);

    useEffect(() => {
        if (profile) {
            setEditProfile({
                userId: profile.userId || '',
                profileImg: profile.profileImg,
                biography: profile.biography || '',
                role: user.role,
            });
    
            async function isValidImage(src) {
                return new Promise(resolve => {
                    const img = new Image();
                    img.onload = () => resolve(true);
                    img.onerror = () => resolve(false);
                    img.src = src; 
                });
            }
    
            if (user.role === "teacher") {
                if(!profile.posts){
                    const fetchUserPosts = async () => {
                        const posts = await handleGetPostByUserId(profile.userId);
                        setUserPosts(profile.posts);
                    };
                    fetchUserPosts();
                }else{
                    setUserPosts(profile.posts);
                }
            }

            isValidImage(profile.profileImg).then(valid => {
                setImageExists(valid);
            });
        }
    }, [profile, handleGetPostByUserId, user.role]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleUpdateProfile(editProfile.userId, editProfile.profileImg, editProfile.biography, editProfile.role);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditProfile(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="max-w-4xl mx-auto p-5">
            {!profile ? (
                <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin" /></div>
            ) : (
                <>
                    {isEditing ? (
                        <Card className="shadow rounded-lg p-6 text-center">
                            <form onSubmit={handleSubmit} >
                                <div className="mb-4">
                                    <Label className="block font-bold mb-2" htmlFor="biography">
                                        Biography
                                    </Label>
                                    <Textarea id="biography" name="biography" rows="3" placeholder="Write your biography..." className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" value={editProfile.biography} onChange={handleChange} ></Textarea>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <Button className="hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                        Save
                                    </Button>
                                    <Button variant="destructive" className="hover:bg-gray-500 font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded" onClick={() => setIsEditing(false)} type="button">
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </Card>
                    ) : (
                        <Card className="shadow rounded-lg p-6 text-center">
                            <Avatar className="rounded-full h-32 w-32 object-cover mx-auto">
                                {imageExists ? (
                                    <AvatarImage src={editProfile.profileImg} alt="Profile Image" />
                                ) : (
                                    <AvatarImage src="/assets/defaultuser.png" alt="Default Profile Image" />
                                )}
                            </Avatar>
                            <CardTitle className="text-lg font-semibold mt-2">{editProfile.userId}</CardTitle>
                            <CardDescription>{editProfile.role}</CardDescription>
                            <CardDescription>{editProfile.biography}</CardDescription>
                            
                            <Button onClick={() => setIsEditing(true)} className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                                Edit Profile
                            </Button>
                        </Card>
                    )}
                    {user.role === "teacher" && (
                        <section className="mt-10">
                            <h2 className="text-xl font-semibold mb-4">Your Posts</h2>
                            {!userPosts ? (
                            <div className="flex justify-center items-center h-screen">
                                <Loader2 className="animate-spin" />
                            </div>
                            ) : (
                            userPosts.length > 0 ? (
                                userPosts.map((post) => (
                                    <Card key={post.postId} className="shadow rounded-lg p-4 mb-6 hover:bg-muted" >
                                        <Link to={`/posts/${post.postId}`} className="w-full">
                                        <CardTitle className="text-lg font-semibold">{post.title}</CardTitle>
                                        <CardDescription className="text-gray-600">{post.description}</CardDescription>
                                        </Link>
                                    </Card>
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

export default Profile;
