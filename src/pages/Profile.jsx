import React, { useContext, useState, useEffect } from 'react';
import { ProfileContext } from '@/contexts/profile';
import FormHeading from "@/components/FormHeading";
import { usePosts, useAuth } from "@/hooks"; 
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

    useEffect(() => {
        if (profile) {
            setEditProfile({
                userId: profile.userId || '',
                profileImg: profile.profileImg || 'https://via.placeholder.com/150',
                biography: profile.biography || '',
                role: user.role || '',
            });

            if (user.role === "Teacher") {
                const fetchUserPosts = async () => {
                    const posts = await handleGetPostByUserId(profile.userId);
                    setUserPosts(posts);
                };
                fetchUserPosts();
            }
        }
    }, [profile, handleGetPostByUserId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleUpdateProfile(editProfile.userId, editProfile.profileImg, editProfile.biography, editProfile.role);
        setIsEditing(false);
    };

    return (
        <div className="max-w-4xl mx-auto p-5">
            <FormHeading>Profile</FormHeading>
            {!profile ? (
                <div className="text-center py-10">
                    <h1 className="text-xl font-semibold">Loading Profile...</h1>
                </div>
            ) : (
                <>
                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="biography">
                                    Biography
                                </label>
                                <textarea id="biography" name="biography" rows="3" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={editProfile.biography} onChange={handleChange}></textarea>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <Button className="hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                    Save
                                </Button>
                                <Button className="bg-transparent hover:bg-gray-500 text-black font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded" onClick={() => setIsEditing(false)} type="button">
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <Card className="shadow rounded-lg p-6 text-center">
                            <img className="rounded-full h-32 w-32 object-cover mx-auto" src={editProfile.profileImg} alt="Profile" />
                            <CardTitle className="text-lg font-semibold mt-2 text-black">{editProfile.userId}</CardTitle>
                            <CardDescription>Role: {editProfile.role}</CardDescription>
                            <CardDescription>{editProfile.biography}</CardDescription>
                            
                            <Button onClick={() => setIsEditing(true)} className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                                Edit Profile
                            </Button>
                        </Card>
                    )}
                    {user.role === "Teacher" && (
                        <section className="mt-10">
                            <h2 className="text-xl font-semibold mb-4">User's Posts</h2>
                            {userPosts.length > 0 ? (
                                userPosts.map((post) => (
                                    <div key={post.id} className="bg-white shadow rounded-lg p-4 mb-6">
                                        <h3 className="text-lg font-semibold">{post.title}</h3>
                                        <p className="text-gray-600">{post.content}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600">No posts found.</p>
                            )}
                        </section>
                    )}
                </>
            )}
        </div>
    );
}

export default Profile;
