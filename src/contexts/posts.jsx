import { useState, createContext, useEffect } from "react";
import { useAuth } from "@/hooks";
import { POSTS_BASE_URL } from "../constants";

export const PostsContext = createContext({
  posts: [],
  handleAddComment: () => {},
  handleDeletePost: () => {},
  handleDeleteComment: () => {},
  handleCreatePost: () => {},
  handleUpdatePost: () => {}
});

export default function PostsProvider({ children }) {
  const { isLoggedIn, getToken } = useAuth();

  const [posts, setPosts] = useState([]);
  

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    async function fetchPosts() {
      setPosts(await getPosts(`token=${getToken()}`));
    }
    fetchPosts();
  }, [isLoggedIn, getToken]);

  const getPosts = async (token) => {
    try {
      const response = await fetch(`${POSTS_BASE_URL}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": POSTS_BASE_URL,
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch posts");
        return [];
      }

      const data = await response.json();
      return data.post;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  };

  const handleAddComment = async (postId, comment) => {
    try {
      const response = await fetch(`${POSTS_BASE_URL}/posts/${postId}/addcomment`, {
        method: 'POST',
        headers: {
			'Authorization': `Bearer token=${getToken()}`,
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": POSTS_BASE_URL,
        },
        body: JSON.stringify({
          comment,
        }),
      });
      const data = await response.json();
      console.log('Add Comment Response:', data);
      // Update posts state if necessary
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
		
      const response = await fetch(`${POSTS_BASE_URL}/posts/delete/${postId}`, {
        method: 'DELETE',
        headers: {
			'Authorization': `Bearer token=${getToken()}`,
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": POSTS_BASE_URL,
        },
      });
	  console.log(getToken());
      const data = await response.json();
      console.log('Delete Post Response:', data);
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
			'Authorization': `Bearer token=${getToken()}`,
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": POSTS_BASE_URL,
        },
      });
      const data = await response.json();
      console.log('Delete Comment Response:', data);
      // Update posts state if necessary
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };



const handleCreatePost = async ({ userId, title, description, image, lectureURL }) => {
	try {
	  const response = await fetch(`${POSTS_BASE_URL}/posts/create`, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer token=${getToken()}`,
		  'Content-Type': 'application/json;charset=UTF-8',
		  'Access-Control-Allow-Origin': POSTS_BASE_URL,
		},
		body: JSON.stringify({
			userId, 
			title,
			description,
			image,
			lectureURL,
		  }),
	  });
	  const data = await response.json();
	  console.log('Create Post Response:', data);
	  
	} catch (error) {
	  console.error('Error creating post:', error);
	}
  };
  

  
const handleUpdatePost = async (postId, { title, description, image, lectureURL }) => {
	try {
	  const response = await fetch(`${POSTS_BASE_URL}/posts/update/${postId}`, {
		method: 'PUT',
		headers: {
			'Authorization': `Bearer token=${getToken()}`,
		  'Content-Type': 'application/json;charset=UTF-8',
		  'Access-Control-Allow-Origin': POSTS_BASE_URL,
		},
		body: JSON.stringify({
		  title,
		  description,
		  image,
		  lectureURL,
		}),
	  });
	  const data = await response.json();
	  console.log(data);
	  console.log('Update Post Response:', data);
	} catch (error) {
	  console.error('Error updating post:', error);
	}
  };

  return (
    <PostsContext.Provider value={{ posts, handleAddComment, handleDeletePost, handleDeleteComment, handleCreatePost, handleUpdatePost }}>
      {children}
    </PostsContext.Provider>
  );
}
