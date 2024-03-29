import React, { useState, useEffect } from "react";
import { POSTS_BASE_URL, PROFILE_BASE_URL } from "../constants";
import { useProfile } from "@/hooks";
import { Loader2 } from "lucide-react";


import { Button } from "@/components/ui/button";

function Test() {
  const token = localStorage.getItem("jwt");
  const { profile } = useProfile();
  const [posts, setPosts] = useState([]);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${POSTS_BASE_URL}/posts`, {
          headers: {
            Authorization: `Bearer token=${token}`,
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": POSTS_BASE_URL,
          },
        });
        const data = await response.json();
        console.log(data);
        setPosts(data.post);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    const fetchProfiles = async () => {
      try {
        const response = await fetch(`${PROFILE_BASE_URL}/all`, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": PROFILE_BASE_URL,
            Authorization: `Bearer token=${token}`,
          },
        });

        if (!response.ok) {
          console.error("Failed to fetch profiles");
          return null;
        }

        const data = await response.json();

        if (!data || data.success === false) {
          console.error("Failed to fetch profiles:", data.message);
          return null;
        }

        setProfiles(data.profile);
      } catch (error) {
        console.error("Error fetching profiles:", error);
        return null;
      }
    };

    fetchPosts();
    fetchProfiles();

    handleGetPostByUserId("meharjeet1234");
  }, []);

  const handleAddComment = async (postId) => {
    try {
      const response = await fetch(`${POSTS_BASE_URL}/posts/${postId}/addcomment`, {
        method: "POST",
        headers: {
          Authorization: `Bearer token=${token}`,
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": POSTS_BASE_URL,
        },
        body: JSON.stringify({
          userId: profile.userId,
          comment: "Example comment 2",
        }),
      });
      const data = await response.json();
      console.log("Create Comment Response:", data);
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`${POSTS_BASE_URL}/posts/delete/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer token=${token}`,
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": POSTS_BASE_URL,
        },
      });
      const data = await response.json();
      console.log("Delete Post Response:", data);
      setPosts(posts.filter((post) => post.postId !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      const response = await fetch(`${POSTS_BASE_URL}/posts/${postId}/comments/${commentId}/delete`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer token=${token}`,
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": POSTS_BASE_URL,
        },
      });
      const data = await response.json();
      console.log("Delete Comment Response:", data);

      setPosts(
        posts.map((post) => {
          if (post.postId === postId) {
            const updatedComments = { ...post.comments };
            delete updatedComments[commentId];
            return { ...post, comments: updatedComments };
          }
          return post;
        })
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleCreatePost = async () => {
    try {
      const response = await fetch(`${POSTS_BASE_URL}/posts/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer token=${token}`,
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": POSTS_BASE_URL,
        },
        body: JSON.stringify({
          userId: profile.userId,
          image: "example_image_url",
          description: "Example description",
          title: "Example Title",
          lectureURL: "Example URL",
        }),
      });
      const data = await response.json();
      
      console.log("Create Post Response:", data);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleUpdatePost = async (postId) => {
    try {
      const response = await fetch(`${POSTS_BASE_URL}/posts/update/${postId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer token=${token}`,
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": POSTS_BASE_URL,
        },
        body: JSON.stringify({
          image: "https://via.placeholder.com/400x400",
        }),
      });
      console.log("Update Post ");
      const data = await response.json();
      console.log("Update Post Response:", data);
    } catch (error) {
      console.error("Error updating post:", error);
    }

    const handleGetProfileById = async (userId) => {
      try {
        const response = await fetch(`${PROFILE_BASE_URL}/info/${userId}`, {
          headers: {
            Authorization: `Bearer token=${token}`,
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": PROFILE_BASE_URL,
          },
        });
        const data = await response.json();
        
        console.log("Get Profile by ID Response:", data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

  };

  const handleGetPostByUserId = async (userId) => {
    try {
      const response = await fetch(`${POSTS_BASE_URL}/posts/user/${userId}`, {
        headers: {
          Authorization: `Bearer token=${token}`,
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": POSTS_BASE_URL,
        },
      });
      const data = await response.json();
      console.log("Get Posts by User ID Response:", data);
    } catch (error) {
      console.error("Error fetching posts by user ID:", error);
    }
  };

  const handleUpdateProfile = async (userId, profileImg= undefined, biography = undefined, nickname = undefined, role = undefined) => {
		try {
			const response = await fetch(`${PROFILE_BASE_URL}/edit`, {
				method: "PUT",
				headers: {
					Authorization: `Bearer token=${token}`,
					"Content-Type": "application/json;charset=UTF-8",
					"Access-Control-Allow-Origin": PROFILE_BASE_URL,
				},
				body: JSON.stringify({
					newProfileData: {
						userId: userId,
						profileImg: "https://via.placeholder.com/400x400",
						biography: biography,
            nickname: nickname,
            role: role,
					},
				}),
			});
			const data = await response.json();
			console.log("Update Profile Response:", data);
		} catch (error) {
			console.error("Error updating profile:", error);
		}
	};


	return (
		<div>
			<h1>Test Post Functions</h1>
			<div>
				<Button onClick={handleCreatePost}>Create Post</Button>
			</div>
			{posts === null ? (
         <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin" /></div>
      ) : posts.map((post) => (
        <div key={post.postId}>
          <h2>Title: {post.title}</h2>
          <p>Description: {post.description}</p>
          <p>Posted By: {post.postedBy}</p>
          <p>Image: {post.image}</p>
          <p>
            Created At:{" "}
            {new Date(post.createdAt._seconds * 1000).toLocaleString()}
					</p>
					<p>Lecture URL: {post.lectureURL}</p>
					<Button onClick={() => handleDeletePost(post.postId)}>
						Delete Post
					</Button>
					<Button onClick={() => handleUpdatePost(post.postId)}>
						Update Post
					</Button>
					<ul>
						{Object.keys(post.comments).map((commentId) => (
							<li key={commentId}>
                <p>Comment Author: {post.comments[commentId].author}</p>
                <p>Comment: {post.comments[commentId].comment}</p>
                <p>{new Date(post.comments[commentId].createdAt._seconds * 1000).toLocaleString()}</p>
								<Button
									onClick={() =>
										handleDeleteComment(
											post.postId,
											commentId
										)
									}
								>
									Delete Comment
								</Button>
							</li>
						))}
					</ul>
					<Button onClick={() => handleAddComment(post.postId)}>
						Add Comment
					</Button>
				</div>
			))}
			<h1>Test Profile Functions</h1>
			<div></div>
			<h1>Manage Profiles</h1>
			<div>
				{profiles.map((profile) => (
					<div key={profile.id}>
						<p>Username: {profile.userId}</p>
						<img src={profile.profileImg} alt="Profile Image" style={{width: '5%', height: 'auto'}}/>
						<p>Bio: {profile.biography}</p>
            <p>Role: {profile.role}</p>
						<Button
							onClick={() => handleUpdateProfile(profile.userId)}
						>
							Update Profile
						</Button>
					</div>
				))}
			</div>
		</div>
	);
}

export default Test;
