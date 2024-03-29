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

  const handleMouseEnter = (commentId) => {
    setHoveredCommentId(commentId);
  };
user
  const handleMouseLeave = () => {
    setHoveredCommentId(null);
  };
  useEffect(() => {
    
    async function fetchPost() {
      const fetchedPost = await getPostById(postSlug);
      setPost(fetchedPost);
    }
    fetchPost();
    if(user.role === "admin" || user.userId === post?.postedBy ){
      setPermissions(true);
    }
    
    
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
    return <div>Loading post...</div>;
  }

    return (
        <Card className="max-w-4xl mx-auto p-4 shadow-md rounded-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold text-center mb-6">{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
          <img src={post.image} alt="Thumbnail" />
            <CardDescription>Description: {post.description}</CardDescription>
            <CardDescription>Posted by: {post.postedBy}</CardDescription>
            <CardDescription>Date: {new Date(post.createdAt._seconds * 1000).toLocaleString()}</CardDescription>
            <CardDescription>Lecture URL: {post.lectureURL}</CardDescription>
          </CardContent>
          <CardContent>
            <Label className="text-lg font-bold mb-3">Comments</Label>
            <div>
              {post.comments && Object.entries(post.comments).map(([commentId, comment]) => (
                <div key={commentId} className="relative flex flex-col space-y-4 mb-4 hover:bg-muted" onMouseEnter={() => handleMouseEnter(commentId)} onMouseLeave={() => handleMouseLeave(commentId)} >
                  <div className="flex justify-between">
                    <span className="text-sm">@{comment.author}</span>
                    <span className="text-sm">{new Date(comment.createdAt._seconds * 1000).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-full">{comment.comment}</div>
                    {hasPermissions && hoveredCommentId === commentId && (
                      <Button onClick={() => handleDeleteComment(post.postId, commentId)} className="bg-transparent hover:bg-transparent cursor-pointer text-sm">
                        🗑️
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>



            <div className="flex w-full items-center space-x-2">
                <Input
                    type="text"
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={handleCommentChange}
                    className="w-full"
                />
                <Button onClick={submitComment} >Post</Button>
            </div>
            </CardContent>
            <div className=" p-4 flex justify-end items-center gap-2">
                <Button onClick={navigateToEdit} variant="secondary">Edit</Button>
                <Button onClick={deletePost} variant="destructive">Delete</Button>
            </div>

        </Card>
    );
}

export default Post;
