import React, { useState, useEffect } from "react";
import { usePosts, useAuth } from "@/hooks";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useProfile } from "@/hooks";

function User() {
	const { handleGetPostByUserId , posts} = usePosts();
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

				if (
					fetchedProfile.role === "teacher" &&
					fetchedProfile.userId
				) {

                    const postsWithUserId = posts.filter(post => post.postedBy === fetchedProfile.userId);
                    if (postsWithUserId) {
                        setUserPosts(postsWithUserId);
                    } else {
                        const myPosts = await handleGetPostByUserId(fetchedProfile.userId);
                        setUserPosts(myPosts);
                    }
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
		return new Promise((resolve) => {
			const img = new Image();
			img.onload = () => resolve(true);
			img.onerror = () => resolve(false);
			img.src = src;
		});
	}

	return (
		<div className="mx-auto max-w-4xl p-5">
			{!userProfile ? (
				<div className="flex h-screen items-center justify-center">
					<Loader2 className="animate-spin" />
				</div>
			) : (
				<>
					<Card className="rounded-lg p-6 text-center shadow">
						<div className="mx-auto">
							<div className="flex justify-center">
								<div className="h-32 w-32">
									{imageExists ? (
										<img
											src={userProfile.profileImg}
											alt="Profile Image"
											className="h-full w-full rounded-full object-cover"
										/>
									) : (
										<img
											src="/assets/defaultuser.png"
											alt="Default Profile Image"
											className="h-full w-full rounded-full object-cover"
										/>
									)}
								</div>
							</div>
							<CardTitle className="mt-2 text-lg font-semibold">
								{userProfile.userId}
							</CardTitle>
							<CardDescription>
								{userProfile.role}
							</CardDescription>
							<CardDescription>
								{userProfile.biography}
							</CardDescription>
						</div>
					</Card>

					{userProfile.role === "teacher" && (
						<section className="mt-10">
							<h2 className="mb-4 text-xl font-semibold">
								{userProfile.userId}'s Posts
							</h2>
							{!userPosts ? (
								<div className="flex h-screen items-center justify-center">
									<Loader2 className="animate-spin" />
								</div>
							) : userPosts.length > 0 ? (
								userPosts.map((post) => (
									<Link
										key={post.postId}
										to={`/posts/${post.postId}`}
										className="w-full"
									>
										<Card className="mb-6 rounded-lg p-4 shadow hover:bg-muted">
											<CardTitle className="text-lg font-semibold">
												{post.title}
											</CardTitle>
											<CardDescription className="text-gray-600">
												{post.description}
											</CardDescription>
										</Card>
									</Link>
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

export default User;
