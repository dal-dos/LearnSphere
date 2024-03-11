import React from "react";
import { Outlet } from "react-router-dom";
import './Lectures.css'

function Lectures() {
  return (
    <div className="home">
      <div class="container">
        <Outlet />
      </div>
    </div>
  );
}

export default Lectures;
