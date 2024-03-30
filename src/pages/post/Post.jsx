import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { POSTS_BASE_URL } from "../../constants";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import { usePosts } from  "@/hooks";
import { useAuth } from  "@/hooks";
import { Card, CardTitle, CardDescription, CardContent, CardHeader, CardFooter} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from '@radix-ui/react-dropdown-menu';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

function Post() {
  const { postSlug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getPostById, handleDeletePost, handleAddComment, handleDeleteComment, getPost } = usePosts(); 
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState(""); 
  const [hasPermissions, setPermissions] = useState(false);
  const [hoveredCommentId, setHoveredCommentId] = useState(null);
  const [imageExists, setImageExists] = useState(false);
  const [youtubeVideoId, setYoutubeVideoId] = useState(null); // State to store YouTube video ID

  const handleMouseEnter = (commentId) => {
    setHoveredCommentId(commentId);
  };

  const handleMouseLeave = () => {
    setHoveredCommentId(null);
  };
  
  useEffect(() => {
    async function fetchPost() {
      const fetchedPost = await getPostById(postSlug);
      setPost(fetchedPost);
  
      if (fetchedPost) {
        const currentUserIsAdmin = user.role === "admin";
        const currentUserIsPostOwner = fetchedPost.postedBy === user.username;
  
        setPermissions(currentUserIsAdmin || currentUserIsPostOwner);
      }

      function isValidImage(src) {
        return new Promise(resolve => {
          const img = new Image();
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
          img.src = src;
        });
      }

      if (fetchedPost && fetchedPost.image) {
        isValidImage(fetchedPost.image).then(valid => {
          setImageExists(valid);
        });
      }

      // Check if lectureURL is a valid YouTube video and extract video ID
      const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = fetchedPost.lectureURL.match(youtubeRegex);
      if (match) {
        setYoutubeVideoId(match[1]);
      }
    }
    fetchPost();
  }, [getPostById, postSlug]);
  
  



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

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const submitComment = async () => {
    if (comment.trim()) {
      try {
        await handleAddComment(post.postId, comment);
        setComment(""); 
        toast({
          title: "Comment added successfully",
        });
      } catch (error) {
        console.error('Error adding comment:', error);
        toast({
          variant: "destructive",
          title: "Failed to add comment",
          description: "An error occurred while trying to add the comment.",
        });
      }
    }
  };

  if (!post) {
    return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin" /></div>;
  }

    return (
      <Card className="max-w-4xl mx-auto p-4 shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold text-center mb-6">{post.title}</CardTitle>
          <CardDescription className="text-center">By: {post.postedBy}</CardDescription>
        </CardHeader>
        <CardContent className="mt-6 mb-6">
          {imageExists && (
            <img src={post.image} alt="Thumbnail" className="mb-4" />
          )}

          <CardDescription className="mb-4">{post.description}</CardDescription>
          
          {youtubeVideoId && ( // Render YouTube video if valid ID exists
            <div className="mb-4">
              <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

          <CardDescription className="mt-4">{new Date(post.createdAt._seconds * 1000).toLocaleString()}</CardDescription>
        </CardContent>
      </Card>
    );
}

export default Post;
