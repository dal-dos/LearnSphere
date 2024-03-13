import React from "react";
import { Outlet, Link } from "react-router-dom";
import "../../styles/Lectures.css";

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
