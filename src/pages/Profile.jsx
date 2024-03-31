import React, { useContext, useState, useEffect } from "react";
import { ProfileContext } from "@/contexts/profile";
import { usePosts, useAuth } from "@/hooks";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Pencil } from "lucide-react";
import { Link } from "react-router-dom";

function Profile() {
	const { profile, handleUpdateProfile } = useContext(ProfileContext);
	const { handleGetPostByUserId, userPosts } = usePosts();
	const [isEditing, setIsEditing] = useState(false);
	const [editProfile, setEditProfile] = useState({
		userId: "",
		profileImg: "",
		biography: "",
		role: "",
	});

	const { user } = useAuth();
	const [imageExists, setImageExists] = useState(false);

	useEffect(() => {
		if (profile) {
			setEditProfile({
				userId: profile.userId || "",
				profileImg: profile.profileImg,
				biography: profile.biography || "",
				role: user.role,
			});

			async function isValidImage(src) {
				return new Promise((resolve) => {
					const img = new Image();
					img.onload = () => resolve(true);
					img.onerror = () => resolve(false);
					img.src = src;
				});
			}

			isValidImage(profile.profileImg).then((valid) => {
				setImageExists(valid);
			});
		}
	}, [profile, handleGetPostByUserId, user.role]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		await handleUpdateProfile(
			editProfile.userId,
			editProfile.profileImg,
			editProfile.biography,
			editProfile.role
		);
		setIsEditing(false);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setEditProfile((prev) => ({ ...prev, [name]: value }));
	};

	const isValidImageUrl = (url) => {
		const img = new Image();
		img.src = url;
		return img.complete || img.height > 0;
	};

	return (
		<div className="mx-auto max-w-4xl p-5">
			{!profile ? (
				<div className="flex h-screen items-center justify-center">
					<Loader2 className="animate-spin" />
				</div>
			) : (
				<>
					{isEditing ? (
						<Card className="rounded-lg p-6 text-center shadow">
							<form onSubmit={handleSubmit}>
								<div className="mb-4">
									<Label
										className="mb-2 block font-bold"
										htmlFor="biography"
									>
										Biography
									</Label>
									<Textarea
										id="biography"
										name="biography"
										rows="3"
										placeholder="Write your biography..."
										className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
										value={editProfile.biography}
										onChange={handleChange}
									></Textarea>
								</div>

								<div className="flex items-center justify-between">
									<Button
										className="focus:shadow-outline rounded px-4 py-2 font-bold hover:bg-blue-700 focus:outline-none"
										type="submit"
									>
										Save
									</Button>
									<Button
										variant="destructive"
										className="rounded border px-4 py-2 font-semibold hover:border-transparent hover:bg-gray-500 hover:text-white"
										onClick={() => setIsEditing(false)}
										type="button"
									>
										Cancel
									</Button>
								</div>
							</form>
						</Card>
					) : (
						<Card className="relative rounded-lg p-6 text-center shadow">
							<Avatar className="mx-auto h-32 w-32 rounded-full object-cover">
								{imageExists ? (
									<AvatarImage
										src={editProfile.profileImg}
										alt="Profile Image"
									/>
								) : (
									<AvatarImage
										src="/assets/defaultuser.png"
										alt="Default Profile Image"
									/>
								)}
							</Avatar>
							<CardTitle className="mt-2 text-lg font-semibold">
								{editProfile.userId}
							</CardTitle>
							<CardDescription>
								{editProfile.role}
							</CardDescription>
							<CardDescription>
								{editProfile.biography}
							</CardDescription>

							<div className="absolute bottom-0 right-0 mb-4 mr-4">
								<Button
									onClick={() => setIsEditing(true)}
									className="text-inverted bg-transparant rounded px-4 py-2 font-bold hover:bg-muted"
									style={{ fontSize: "1.6rem" }}
								>
									<Pencil />
								</Button>
							</div>
						</Card>
					)}

					{user.role === "teacher" && (
						<section className="mt-10">
							<h2 className="mb-4 text-xl font-semibold">
								Your Posts
							</h2>
							{!userPosts ? (
								<div className="flex h-screen items-center justify-center">
									<Loader2 className="animate-spin" />
								</div>
							) : userPosts.length > 0 ? (
								userPosts.map((post) => (
									<Card
										key={post.postId}
										className="mb-6 rounded-lg p-4 shadow hover:bg-muted"
									>
										<Link
											to={`/posts/${post.postId}`}
											className="w-full"
										>
											<CardTitle className="text-lg font-semibold">
												{post.title}
											</CardTitle>
											<CardDescription className="text-gray-600">
												{post.description}
											</CardDescription>
										</Link>
									</Card>
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
