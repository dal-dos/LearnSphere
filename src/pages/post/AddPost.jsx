import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePosts, useProfile } from "../../hooks";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardTitle, CardDescription, CardContent, CardHeader, CardFooter} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from '@radix-ui/react-dropdown-menu';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function AddPost() {
  const { handleCreatePost } = usePosts(); 
  const { profile } = useProfile(); 

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageLink, setImageLink] = useState('');

  const [lectureURL, setLectureURL] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  // const submitPost = async (e) => {
  //   e.preventDefault();
    
  //   try {
  //     await handleCreatePost({
  //       userId: profile.userId, 
  //       title,
  //       description,
  //       image: imageLink,
  //       lectureURL,
  //     });

	//     toast({title: "Created Post"});
  //     navigate('/posts'); 
  //   } catch (error) {
  //     console.error('Failed to create post:', error);
  //     toast({
  //       variant: "destructive",
  //       title: "Failed to create post",
  //       description: "An error occurred while trying to delete the post.",
  //     });
  //   }
  // };

  const submitPost = async (e) => {
    e.preventDefault();
  
    // Validate image link
    try {
      const img = new Image();
      img.onload = () => {
        // Image loaded successfully, proceed with submitting the form
        try {
          handleCreatePost({
            userId: profile.userId,
            title,
            description,
            image: imageLink,
            lectureURL,
          }).then(res => {
            if (res.success) {
              toast({ title: "Created Post", description: res.message });
              navigate("/posts");
            } else {
              toast({
                variant: "destructive",
                title: "Failed to create post",
                description:
                  res.message ||
                  "Failed to create post. Please try again",
              });
            }
          }).catch(error => {
            console.error("Failed to create post:", error);
            toast({
              variant: "destructive",
              title: "Failed to create post",
              description:
                error.message || "Failed to create post. Please try again",
            });
          });
        } catch (error) {
          console.error("Failed to create post:", error);
          toast({
            variant: "destructive",
            title: "Failed to create post",
            description:
              error.message || "Failed to create post. Please try again",
          });
        }
      };
      img.onerror = () => {
        // Image failed to load, show error message
        toast({
          variant: "destructive",
          title: "Invalid image link",
          description: "Please provide a valid image link.",
        });
      };
      img.src = imageLink;
    } catch (error) {
      console.error("Error validating image link:", error);
      toast({
        variant: "destructive",
        title: "Failed to validate image link",
        description: "An error occurred while validating the image link.",
      });
    }
  
    // Validate YouTube video URL
    const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    if (!youtubeRegex.test(lectureURL)) {
      toast({
        variant: "destructive",
        title: "Invalid YouTube video URL",
        description: "Please provide a valid YouTube video URL.",
      });
      return;
    }
  
    // If both image link and YouTube video URL are valid, the form will be submitted
  };
  

  return (
    <Card className="max-w-4xl mx-auto p-4 shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold text-center mb-6">Post a New Lecture</h2>
      <form onSubmit={submitPost} className="space-y-6">
        <div>
          <Label htmlFor="title" className="block font-medium mb-2">Title</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="input sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Title..."
          />
        </div>
        <div>
          <Label htmlFor="description" className="block font-medium mb-2">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="textarea sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            rows="4"
            placeholder="Description..."
          />
        </div>
        <div>
          <Label htmlFor="imageLink" className="block font-medium mb-2">Image Link</Label>
          <Input
            id="imageLink"
            type="text"
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
            className="input border sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Thumbnail Image URL..."
          />
        </div>
        <div>
          <Label htmlFor="lectureURL" className="block font-medium mb-2">Lecture URL</Label>
          <Input
          
            id="lectureURL"
            type="text"
            value={lectureURL}
            onChange={(e) => setLectureURL(e.target.value)}
            required
            className="input sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Youtube video url..."
          />
        </div>
        <Button type="submit" className="w-full">
          Post Lecture
        </Button>
      </form>
    </Card>
  );
}

export default AddPost;
