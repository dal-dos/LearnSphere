import React from "react";
import { Outlet } from "react-router-dom";
import "../../styles/Lectures.css";

function Lectures() {
	return (
		<div className="home">
			<div className="container">
				<Outlet />
			</div>
		</div>
	);
}

export default Lectures;
