// Posts.tsx
import React from "react";
import { Link } from "react-router-dom";
import './Lectures.css'

function Posts() {
  const posts = [
    {
      id: 1,
      title: "Full-Stack Web Development with React and Node.js",
      author: "Jane Doe",
      imageUrl: "https://via.placeholder.com/400x200",
      content: "Dive into full-stack development with this comprehensive course on React for frontend and Node.js for the backend.",
    },
    {
      id: 2,
      title: "Mastering Cloud Computing with AWS",
      author: "Alex Johnson",
      imageUrl: "https://via.placeholder.com/400x200",
      content: "Learn how to deploy scalable applications and manage your infrastructure with AWS cloud services.",
    },
    // Add more posts as needed
  ];

  return (
    <div className="lecture-posts">
      <div className="container">
        {posts.map((post) => (
          <Link to={`/lectures/${post.id}`} key={post.id} className="post-link">
            <div className="post-card">
              <img
                className="post-image"
                src={post.imageUrl}
                alt={post.title}
              />
              <div className="post-content">
                <h2>{post.title}</h2>
                <p><strong>Author:</strong> {post.author}</p>
                <p>{post.content}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Posts;
