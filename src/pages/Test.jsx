import React, { useState, useEffect } from 'react';
import { POSTS_BASE_URL } from "../constants";
import { useProfile } from "@/hooks";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function Test() {
  const token = localStorage.getItem("jwt");
  const { profile } = useProfile();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch all posts when component mounts
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${POSTS_BASE_URL}/posts`, {
          headers: {
            'Authorization': `Bearer token=${token}`,
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': POSTS_BASE_URL,
          },
        });
        const data = await response.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);
  

  const handleAddComment = async (postId) => {
    try {
      const response = await fetch(`${POSTS_BASE_URL}/posts/${postId}/addcomment`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer token=${token}`,
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': POSTS_BASE_URL,
        },
        body: JSON.stringify({
          comment: 'Example comment'
        })
      });
      const data = await response.json();
      console.log('Create Comment Response:', data);
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`${POSTS_BASE_URL}/posts/delete/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer token=${token}`,
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': POSTS_BASE_URL,
        }
      });
      const data = await response.json();
      console.log('Delete Post Response:', data);
      // Remove deleted post from the state
      setPosts(posts.filter(post => post.postId !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      const response = await fetch(`${POSTS_BASE_URL}/posts/${postId}/comments/${commentId}/delete`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer token=${token}`,
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': POSTS_BASE_URL,
        }
      });
      const data = await response.json();
      console.log('Delete Comment Response:', data);
      // Remove deleted comment from the state
      setPosts(posts.map(post => ({
        ...post,
        comments: post.comments.filter(comment => comment !== commentId)
      })));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleCreatePost = async () => {
    try {
      const response = await fetch(`${POSTS_BASE_URL}/posts/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer token=${token}`,
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': POSTS_BASE_URL,
        },
        body: JSON.stringify({
          userId: profile.username,
          image: 'example_image_url',
          description: "Example description"

        })
      });
      const data = await response.json();
      console.log('Create Post Response:', data);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleUpdatePost = async (postId) => {
    try {
      const response = await fetch(`${POSTS_BASE_URL}/posts/update/${postId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer token=${token}`,
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': POSTS_BASE_URL,
        },
        body: JSON.stringify({
            image: `Example updated image for post ${postId}`,
            description: `Example updated description for post ${postId}`,
        })
      });
      const data = await response.json();
      console.log('Update Post Response:', data);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };
  

  return (
    <div>
      <h1>Test Post Functions</h1>
      <div>
        <Button onClick={handleCreatePost}>Create Post</Button>
      </div>
      {posts.map(post => (
        <div key={post.postId}>
          <h2>description: {post.description}</h2>
          <h2>postedBy: {post.postedBy}</h2>
          <h2>image: {post.image}</h2>
          <Button onClick={() => handleDeletePost(post.postId)}>Delete Post</Button>
          <Button onClick={() => handleUpdatePost(post.postId)}>Update Post</Button>
          <ul>
            {post.comments.map((comment, index) => (
              <li key={index}>
                {comment}
                <Button onClick={() => handleDeleteComment(post.postId, index)}>Delete Comment</Button>
              </li>
            ))}
          </ul>
          <Button onClick={() => handleAddComment(post.postId)}>Add Comment</Button>
        </div>
      ))}
      <h1>Test Profile Functions</h1>
      
    </div>
    
  );
}

export default Test;
