import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { POSTS_BASE_URL } from "../../constants";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import { usePosts } from "../../hooks";


function Post() {

  const { postSlug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { posts, handleDeletePost, handleAddComment, handleDeleteComment } = usePosts(); 

  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const response = await fetch(`${POSTS_BASE_URL}/posts/${postSlug}`, {
          headers: {
            'Authorization': `Bearer token=${token}`,
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': POSTS_BASE_URL,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setPost(data.post);
        } else {
          console.error("Failed to fetch post", data.message);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [postSlug]);



const deletePost = async () => {
    try {
      
      await handleDeletePost(post.postId);
      
      toast({
        title: "Post deleted successfully",
      });
      navigate('/posts'); 
    } catch (error) {
		
      console.error('Error deleting post:', error);
      toast({
        variant: "destructive",
        title: "Failed to delete post",
        description: "An error occurred while trying to delete the post.",
      });
    }
  };

  
    const navigateToEdit = () => {
      navigate('/posts/${postSlug}/edit');
    };


  if (!post) {
    return <div>Loading post...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-5">
      <Card className="bg-blue-600 rounded-lg shadow-lg overflow-hidden">
        <div className="p-5">
          <CardTitle className="text-2xl font-bold mb-3 text-black">{post.title}</CardTitle>
          <CardDescription className="text-gray-100 mb-4">{post.description}</CardDescription>
          <p className="text-gray-100 mb-2">{post.content}</p>
          <h6 className="text-sm text-gray-200 mb-4">Posted by: {post.postedBy} | Slug: {postSlug}</h6>
        </div>
  
        <div className="px-5 py-4">
          <h3 className="text-lg font-bold mb-3 text-black">Comments</h3>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Write a comment..."
              className="w-full p-2 mb-2 text-black text-sm"
              style={{ maxWidth: 'calc(100% - 120px)' }} 
            />
            <button
              className="ml-2 py-1 px-2 bg-blue-800 hover:bg-blue-900 text-white font-bold text-sm rounded"
              style={{ maxWidth: '100px' }}
            >
              Post
            </button>
          </div>
        </div>
  
        <div className="bg-blue-700 p-4 flex justify-end items-center gap-2">
          <Button onClick={navigateToEdit}
            className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
          >
            Update Post
          </Button>
          <Button onClick={deletePost}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete Post
          </Button>
        </div>
      </Card>
    </div>
  );
  
  
  
}

export default Post;
