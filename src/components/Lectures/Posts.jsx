import React from "react";
import { Link } from "react-router-dom";

function Posts() {
  const posts = [
    {
      id: 1,
      title: "Introduction to React",
      author: "John Doe",
      imageUrl: "http://placehold.it/400x200",
      content: "this is a lecture about react",
    },
    {
      id: 2,
      title: "Introduction to Websystems",
      author: "Jerry Smith",
      imageUrl: "http://placehold.it/400x200",
      content: "this is a lecture about web",
    }
    // Add more posts as needed
  ];
  return (
    <div className="lecture-posts">
      <div className="container">
        {posts.map((post) => (
          <Link to={`/lectures/${post.id}`}>
          <div key={post.id} className="row align-items-center my-5">
            <div className="col-lg-5">
              <img
                className="img-fluid rounded mb-4 mb-lg-0"
                src={post.imageUrl}
                alt={post.title}
              />
            </div>
            <div className="col-lg-7">
              <h2 className="font-weight-light">{post.title}</h2>
              <p>
                <strong>Author:</strong> {post.author}
              </p>
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
