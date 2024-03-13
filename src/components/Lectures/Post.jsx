// Post.tsx
import React, { useEffect } from "react";
import { useParams } from "react-router";
import './Lectures.css'

function Post({objectPost}) {

  let { postSlug } = useParams();

  useEffect(() => {
    // Placeholder for fetch post logic
  }, [postSlug]);

  return (
    <div className="home">
        <h1 className="mt-5">Post Title</h1>
        <h6 className="mb-5">Slug: {postSlug}</h6>
        <p>Post content placeholder</p>
      
    </div>
  );
}

export default Post;
