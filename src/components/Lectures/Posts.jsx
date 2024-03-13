// Posts.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Lectures.css'

function Posts() {
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   fetchPosts();
  // }, []);

  
  // const fetchPosts = async () => {
  //   try{
  //     const response = await fetch("https://post-service-dot-project-416223.uw.r.appspot.com/posts");

  //     const data = await response.json();

  //     console.log(data);

  //     setPosts(data);
  //   } 
    
  //   catch (error){
  //     console.error(error);
  //   }
  // }
  



  const tempPost = [
    {
      postId: 1,
      title: "Full-Stack Web Development with React and Node.js",
      postedBy: "Jane Doe",
      image: "https://via.placeholder.com/400x200",
      description: "Dive into full-stack development with this comprehensive course on React for frontend and Node.js for the backend.",
    },
    {
      postId: 2,
      title: "Mastering Cloud Computing with AWS",
      postedBy: "Alex Johnson",
      image: "https://via.placeholder.com/400x200",
      description: "Learn how to deploy scalable applications and manage your infrastructure with AWS cloud services.",
    },
    // Add more posts as needed
  ];

  return (
    <div className="lecture-posts">
      
      <div className="container">
        
        {tempPost.map((post) => (
          <Link to={`/lectures/${post.postId}`} key={post.postId} className="post-link">
            <div className="post-card">
              <img
                className="post-image"
                src={post.image} //image 
                alt={post.image} //image title {post.imageTitle}
              />
              <div className="post-content">
                <h2>{post.image}</h2>//title {post.title}
                <p><strong>Author:</strong> {post.postedBy}</p>
                <p>{post.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Posts;
