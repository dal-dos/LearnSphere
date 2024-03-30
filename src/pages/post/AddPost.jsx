import React from "react";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../../hooks";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import FormHeading from "@/components/FormHeading";
import ErrorMessage from "@/components/ErrorMessage";

const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;

function AddPost() {
	const { handleCreatePost } = usePosts();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: "",
			description: "",
			image: "https://ecrcommunity.plos.org/wp-content/uploads/sites/9/legacy-featured-images/teach-1820041_1920-16x9.jpg",
			lectureURL: "",
		},
	});

	const navigate = useNavigate();
	const { toast } = useToast();

	const onSubmit = handleSubmit(async (data) => {
	
		const response = await handleCreatePost(data);

		if (response.success) {
			toast({
				title: "Post Created",
				description: response.message,
			});
			navigate("/posts");
		} else {
			toast({
				variant: "destructive",
				title: "Failed to create post",
				description: response.message,
			});
		}
	});

	const isValidImageUrl = (url) => {
		const img = new Image();
		img.src = url;
		return img.complete || img.height > 0;
	};

	return (
		<>
			<Card className="mx-auto max-w-4xl rounded-lg p-4 shadow-md">
				<FormHeading>Post a New Lecture</FormHeading>
				<form onSubmit={onSubmit} className="space-y-6">
					<div className="space-y-2">
						<Label htmlFor="title">Title</Label>
						<Input
							{...register("title", {
								required: "Title is required",
							})}
							placeholder="Title..."
							className={cn(
								errors.title
									? "focus-visible:ring-destructive"
									: null
							)}
						/>
						<ErrorMessage error={errors.title} />
					</div>
					<div className="space-y-2">
						<Label htmlFor="description">Description</Label>
						<Input
							{...register("description", {
								required: "Description is required",
							})}
							placeholder="Description..."
							className={cn(
								errors.description
									? "focus-visible:ring-destructive"
									: null
							)}
						/>
						<ErrorMessage error={errors.description} />
					</div>
					<div className="space-y-2">
						<Label htmlFor="image">Image</Label>
						<Input
							value="https://ecrcommunity.plos.org/wp-content/uploads/sites/9/legacy-featured-images/teach-1820041_1920-16x9.jpg"
							
							{...register("image", {
								required: "Image is required",
								validate: {
									validImage: value => isValidImageUrl(value) || "Invalid image URL",
								},
							})}
							placeholder="Image URL..."
							className={cn(
								errors.image ? "focus-visible:ring-destructive" : null
							)}
						/>
						<ErrorMessage error={errors.image} />
					</div>

					<div className="space-y-2">
						<Label htmlFor="lectureURL">Lecture URL</Label>
						<Input
							{...register("lectureURL", {
								required: "Lecture URL is required",
								pattern: {
									value: youtubeRegex,
									message: "Invalid YouTube URL",
								},
							})}
							placeholder="Lecture URL..."
							className={cn(
								errors.lectureURL
									? "focus-visible:ring-destructive"
									: null
							)}
						/>
						<ErrorMessage error={errors.lectureURL} />
					</div>
					<Button type="submit" className="w-full">
						Post Lecture
					</Button>
				</form>
			</Card>
		</>
	);
}

export default AddPost;
