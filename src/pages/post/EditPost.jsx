import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePosts } from "../../hooks";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // Assuming Textarea is from the same ui library
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/components/ErrorMessage"; // Assuming you have a similar ErrorMessage component

function EditPost() {
	const { postSlug } = useParams();
	const { posts, handleUpdatePost } = usePosts();
	const navigate = useNavigate();
	const { toast } = useToast();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: "",
			description: "",
			image: "",
			lectureURL: "",
		},
	});

	useEffect(() => {
		const postToEdit = posts.find((post) => post.postId === postSlug);
		if (postToEdit) {
			setValue("title", postToEdit.title);
			setValue("description", postToEdit.description);
			setValue("image", postToEdit.image); // Assuming 'image' is the correct field
			setValue("lectureURL", postToEdit.lectureURL);
		}
	}, [postSlug, posts, setValue]);

	const submitChanges = handleSubmit(async (data) => {
		try {
			const result = await handleUpdatePost(postSlug, {
				title: data.title,
				description: data.description,
				image: data.image,
				lectureURL: data.lectureURL,
			});

			if (result.success) {
				toast({ title: "Updated Post" });
				navigate(`/posts`);
				window.location.reload();
			} else {
				console.error("Failed to update post:", result.message);
				toast({
					variant: "destructive",
					title: "Failed to update post",
					description:
						result.message ||
						"An error occurred while trying to update the post.",
				});
			}
		} catch (error) {
			console.error("Failed to update post:", error);
			toast({
				variant: "destructive",
				title: "Failed to update post",
				description:
					error.message ||
					"An unexpected error occurred while trying to update the post.",
			});
		}
	});

	return (
		<Card className="mx-auto max-w-4xl rounded-lg p-4 shadow-md">
			<h2 className="mb-6 text-center text-3xl font-semibold">
				Edit Lecture
			</h2>
			<form onSubmit={submitChanges} className="space-y-6">
				<div>
					<Label htmlFor="title">Title</Label>
					<Input
						id="title"
						{...register("title", {
							required: "Title is required",
						})}
						placeholder="Title..."
					/>
					{errors.title && (
						<ErrorMessage error={errors.title.message} />
					)}
				</div>
				<div>
					<Label htmlFor="description">Description</Label>
					<Input
						id="description"
						{...register("description", {
							required: "Description is required",
						})}
						placeholder="Description..."
					/>
					{errors.description && (
						<ErrorMessage error={errors.description.message} />
					)}
				</div>
				<div>
					<Label htmlFor="image">Image Link</Label>
					<Input
						id="image"
						{...register("image", {
							required: "Image URL is required",
						})}
						placeholder="Image URL..."
					/>
					{errors.image && (
						<ErrorMessage error={errors.image.message} />
					)}
				</div>
				<div>
					<Label htmlFor="lectureURL">Lecture URL</Label>
					<Input
						id="lectureURL"
						{...register("lectureURL", {
							required: "Lecture URL is required",
						})}
						placeholder="Lecture URL..."
					/>
					{errors.lectureURL && (
						<ErrorMessage error={errors.lectureURL.message} />
					)}
				</div>
				<Button type="submit" className="w-full">
					Update Lecture
				</Button>
			</form>
		</Card>
	);
}

export default EditPost;
