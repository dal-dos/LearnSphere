import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePosts, useProfile } from "../../hooks";
import { useToast } from "@/components/ui/use-toast";
import {
	Card,
	CardTitle,
	CardDescription,
	CardContent,
	CardHeader,
	CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function EditPost() {
	const { postSlug } = useParams();

	const { posts, handleUpdatePost } = usePosts();

	const { profile } = useProfile();

	const navigate = useNavigate();

	const { toast } = useToast();

	const [post, setPost] = useState({
		title: "",
		description: "",
		imageLink: "",
		lectureURL: "",
	});

	useEffect(() => {
		const postToEdit = posts.find((post) => post.id === postSlug);
		if (postToEdit) {
			setPost({
				title: postToEdit.title,
				description: postToEdit.description,
				imageLink: postToEdit.image,
				lectureURL: postToEdit.lectureURL,
			});
		}
	}, [postSlug, posts]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setPost((prevPost) => ({
			...prevPost,
			[name]: value,
		}));
	};

	const submitChanges = async (e) => {
		e.preventDefault();
		try {
			const payload = {
				title: post.title,
				description: post.description,
				image: post.imageLink, 
				lectureURL: post.lectureURL,
			};
	
			const result = await handleUpdatePost(postSlug, payload);
		
			if (result.success) {
				toast({ title: "Updated Post" });
				navigate(`/posts`);
			} else {
				
				console.error("Failed to update post:", result.message);
				toast({
					variant: "destructive",
					title: "Failed to update post",
					description: result.message || "An error occurred while trying to update the post.",
				});
			}
		} catch (error) {
			
			console.error("Failed to update post:", error);
			toast({
				variant: "destructive",
				title: "Failed to update post",
				description: error.message || "An unexpected error occurred while trying to update the post.",
			});
		}
	};
	
	

	return (
		<Card className="mx-auto max-w-4xl rounded-lg p-4 shadow-md">
			<h2 className="mb-6 text-center text-3xl font-semibold">
				Edit Lecture
			</h2>
			<form onSubmit={submitChanges} className="space-y-6">
				<div>
					<Label htmlFor="title" className="mb-2 block font-medium">
						Title
					</Label>
					<Input
						id="title"
						name="title"
						type="text"
						value={post.title}
						onChange={handleChange}
						className="input block w-full rounded-lg p-2.5 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
						placeholder="Title..."
					/>
				</div>
				<div>
					<Label htmlFor="title" className="mb-2 block font-medium">
						Description
					</Label>
					<Textarea
						id="description"
						name="description"
						value={post.description}
						onChange={handleChange}
						className="input block w-full rounded-lg p-2.5 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
						rows="4"
						placeholder="Description..."
					></Textarea>
				</div>
				<div>
					<Label htmlFor="title" className="mb-2 block font-medium">
						Image Link
					</Label>
					<Input
						id="imageLink"
						name="imageLink"
						type="text"
						value={post.imageLink}
						onChange={handleChange}
						className="input block w-full rounded-lg p-2.5 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
						placeholder="Thumbnail Image URL..."
					/>
				</div>
				<div>
					<Label htmlFor="title" className="mb-2 block font-medium">
						Lecture URL
					</Label>
					<Input
						id="lectureURL"
						name="lectureURL"
						type="text"
						value={post.lectureURL}
						onChange={handleChange}
						className="input block w-full rounded-lg p-2.5 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
						placeholder="Youtube video url..."
					/>
				</div>
				<Button type="submit" className="w-full">
					Update Lecture
				</Button>
			</form>
		</Card>
	);
}

export default EditPost;
