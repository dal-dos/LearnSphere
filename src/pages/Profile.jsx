import React, { useContext, useState, useEffect } from "react";
import { ProfileContext } from "@/contexts/profile";
import { usePosts, useAuth } from "@/hooks";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";

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
	const [open, setOpen] = useState(false);

	const isValidImageUrl = (url) => {
		const img = new Image();
		img.src = url;
		return img.complete || img.height > 0;
	};

	useEffect(() => {
		if (profile) {
			if (isValidImageUrl(profile.profileImg)) {
				setImageExists(true);
			}
			setEditProfile({
				userId: profile.userId || "",
				profileImg: profile.profileImg,
				biography: profile.biography || "",
				role: user.role,
			});
		}
	}, [profile, handleGetPostByUserId, user.role]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log(editProfile.userId);
		console.log(editProfile.profileImg);
		console.log(editProfile.biography);
		console.log(editProfile.role);

		if (!isValidImageUrl(editProfile.profileImg)) {
			console.error("Invalid image URL");
			return;
		}
		const response = await handleUpdateProfile(
			profile.userId,
			editProfile.profileImg,
			editProfile.biography,
			profile.role
		);

		if (response) {
			setImageExists(true);
			const tempImg = editProfile.profileImg;
			const tempBio = editProfile.biography;
			setOpen(false);
			editProfile.profileImg = tempImg;
			editProfile.biography = tempBio;
			console.log(editProfile);
			window.location.reload();
		}

		setIsEditing(false);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setEditProfile((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div className="mx-auto max-w-4xl p-5">
			{!profile ? (
				<div className="flex h-screen items-center justify-center">
					<Loader2 className="animate-spin" />
				</div>
			) : (
				<>
					{false ? (
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
								{/* <Button
                                    onClick={() => setIsEditing(true)}
                                    className="text-inverted bg-transparant rounded px-4 py-2 font-bold hover:bg-muted"
                                    style={{ fontSize: "1.6rem" }}
                                >
                                    <Pencil/>
                                </Button> */}
								<Dialog open={open} onOpenChange={setOpen}>
									<DialogTrigger asChild>
										<Button variant="outline">
											<Pencil />
										</Button>
									</DialogTrigger>
									<DialogContent>
										<DialogHeader>
											<DialogTitle>
												Edit profile
											</DialogTitle>
											<DialogDescription>
												Make changes to your profile
												here. Click save when you're
												done.
											</DialogDescription>
										</DialogHeader>
										<div className="grid gap-4 py-4">
											<div className="grid grid-cols-4 items-center gap-4">
												<Label
													className="text-right"
													htmlFor="biography"
												>
													Biography
												</Label>
												<Textarea
													id="biography"
													name="biography"
													rows="3"
													className="col-span-3"
													placeholder="Write your biography..."
													value={
														editProfile.biography
													}
													onChange={handleChange}
												></Textarea>
											</div>
											<div className="grid grid-cols-4 items-center gap-4">
												<Label
													className="text-right"
													htmlFor="profileImg"
												>
													Image URL
												</Label>
												<Input
													id="profileImg"
													name="profileImg"
													placeholder="Profile Image URL..."
													className="col-span-3"
													onChange={handleChange}
												/>
											</div>
										</div>
										<DialogFooter>
											<Button
												type="submit"
												onClick={handleSubmit}
											>
												Save changes
											</Button>
										</DialogFooter>
									</DialogContent>
								</Dialog>
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
