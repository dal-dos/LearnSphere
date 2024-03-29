import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePosts, useProfile } from "../../hooks";
import { useToast } from "@/components/ui/use-toast";

function AddPost() {
  const { handleCreatePost } = usePosts(); 
  const { profile } = useProfile(); 

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageLink, setImageLink] = useState('');

  const [lectureURL, setLectureURL] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const submitPost = async (e) => {
    e.preventDefault();
    
    try {
      await handleCreatePost({
        userId: profile.userId, 
        title,
        description,
        image: imageLink,
        lectureURL,
      });

	  toast({title: "Created Post"});
      navigate('/posts'); 
    } catch (error) {
      console.error('Failed to create post:', error);
      toast({
        variant: "destructive",
        title: "Failed to create post",
        description: "An error occurred while trying to delete the post.",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Post a New Lecture</h2>
      <form onSubmit={submitPost} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="input bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="textarea bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            rows="4"
          />
        </div>
        <div>
          <label htmlFor="imageLink" className="block text-gray-700 font-medium mb-2">Image Link</label>
          <input
            id="imageLink"
            type="text"
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
            className="input bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div>
          <label htmlFor="lectureURL" className="block text-gray-700 font-medium mb-2">Lecture URL</label>
          <input
            id="lectureURL"
            type="text"
            value={lectureURL}
            onChange={(e) => setLectureURL(e.target.value)}
            required
            className="input bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <button type="submit" className="button w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          Post Lecture
        </button>
      </form>
    </div>
  );
}

export default AddPost;
