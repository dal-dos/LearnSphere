// PostLecture.js
import React, { useState } from "react";

function PostLecture() {
  const [lectureData, setLectureData] = useState({
    title: "",
    image: "",
    description: "",
    youtubeUrl: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLectureData({ ...lectureData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here, e.g., send data to backend API
    console.log("Form submitted with data:", lectureData);
    // Reset form fields after submission
    setLectureData({
      title: "",
      image: "",
      description: "",
      youtubeUrl: ""
    });
  };

  return (
    <div>
      <h1>Lecture Submission</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Lecture Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={lectureData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="image">Image URL:</label>
        <input
          type="text"
          id="image"
          name="image"
          value={lectureData.image}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={lectureData.description}
          onChange={handleChange}
          required
        ></textarea>

        <label htmlFor="youtubeUrl">YouTube URL:</label>
        <input
          type="text"
          id="youtubeUrl"
          name="youtubeUrl"
          value={lectureData.youtubeUrl}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit Lecture</button>
      </form>
    </div>
  );
}

export default PostLecture;
