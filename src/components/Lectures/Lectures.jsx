import React from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import './Lectures.css'

function Lectures() {
  return (
    
    <div className="home">
      <Link to="/post-lecture" className="add-lecture-button">
      <div className="add-lecture-button">
        Post Lecture
      </div>
      </Link>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}

export default Lectures;
