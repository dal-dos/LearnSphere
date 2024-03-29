import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePosts, useProfile } from "../../hooks";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardTitle, CardDescription, CardContent, CardHeader, CardFooter} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from '@radix-ui/react-dropdown-menu';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function EditPost() {
  const { postSlug } = useParams();
  
  const { posts, handleUpdatePost } = usePosts();

  const { profile } = useProfile();

  const navigate = useNavigate();

  const { toast } = useToast();

  const [post, setPost] = useState({
    title: '',
    description: '',
    imageLink: '',
    lectureURL: '',
  });

  useEffect(() => {
    const postToEdit = posts.find(post => post.id === postSlug);
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
    setPost(prevPost => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const submitChanges = async (e) => {
    e.preventDefault();
    try {
      await handleUpdatePost(postSlug, {
        ...post
      });

      toast({ title: "Updated Post" });
      navigate(`/posts`);
    } catch (error) {
      console.error('Failed to update post:', error);
      toast({
        variant: "destructive",
        title: "Failed to update post",
        description: "An error occurred while trying to update the post.",
      });
    }
  };

  return (
	<Card className="max-w-4xl mx-auto p-4 shadow-md rounded-lg">
	  <h2 className="text-3xl font-semibold text-center mb-6">Edit Lecture</h2>
	  <form onSubmit={submitChanges} className="space-y-6">
		<div>
		<Label htmlFor="title" className="block font-medium mb-2">Title</Label>
		  <Input
			id="title"
			name="title"
			type="text"
			value={post.title}
			onChange={handleChange}
			required
			className="input sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
			placeholder="Title..."
		  />
		</div>
		<div>
		<Label htmlFor="title" className="block font-medium mb-2">Description</Label>
		  <Textarea
			id="description"
			name="description"
			value={post.description}
			onChange={handleChange}
			required
			className="input sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
			rows="4"
			placeholder="Description..."
		  ></Textarea>
		</div>
		<div>
		<Label htmlFor="title" className="block font-medium mb-2">Image Link</Label>
		  <Input
			id="imageLink"
			name="imageLink"
			type="text"
			value={post.imageLink}
			onChange={handleChange}
			className="input sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
			placeholder="Thumbnail Image URL..."
		  />
		</div>
		<div>
		<Label htmlFor="title" className="block font-medium mb-2">Lecture URL</Label>
		  <Input
			id="lectureURL"
			name="lectureURL"
			type="text"
			value={post.lectureURL}
			onChange={handleChange}
			required
			className="input sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
