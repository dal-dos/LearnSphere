import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePosts, useProfile } from "../../hooks";
import { useToast } from "@/components/ui/use-toast";

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
	<div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
	  <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Edit Lecture</h2>
	  <form onSubmit={submitChanges} className="space-y-6">
		<div>
		  <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title</label>
		  <input
			id="title"
			name="title"
			type="text"
			value={post.title}
			onChange={handleChange}
			required
			className="input bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
		  />
		</div>
		<div>
		  <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
		  <textarea
			id="description"
			name="description"
			value={post.description}
			onChange={handleChange}
			required
			className="textarea bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
			rows="4"
		  ></textarea>
		</div>
		<div>
		  <label htmlFor="imageLink" className="block text-gray-700 font-medium mb-2">Image Link</label>
		  <input
			id="imageLink"
			name="imageLink"
			type="text"
			value={post.imageLink}
			onChange={handleChange}
			className="input bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
		  />
		</div>
		<div>
		  <label htmlFor="lectureURL" className="block text-gray-700 font-medium mb-2">Lecture URL</label>
		  <input
			id="lectureURL"
			name="lectureURL"
			type="text"
			value={post.lectureURL}
			onChange={handleChange}
			required
			className="input bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
		  />
		</div>
		<button type="submit" className="button w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
		  Update Lecture
		</button>
	  </form>
	</div>
  );
  
}

export default EditPost;
