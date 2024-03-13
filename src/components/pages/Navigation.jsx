// Navigation.js

import { NavLink } from "react-router-dom";

import "../styles/Navigation.css";
import { useProfile } from "../../contexts/profile";
import { useEffect } from "react";

function Navigation() {
	const { isLoggedIn } = useProfile();

	// console.log("isLoggedIn in navigation", isLoggedIn);

	return (
		<nav className="navbar">
			<NavLink className="navbar-brand w-auto" to="/">
				LearnSphere
			</NavLink>
			<div>
				<ul className="navbar-nav">
					{isLoggedIn ? (
						<>
							<li className="nav-item">
								<NavLink className="nav-link" to="/dashboard">
									Dashboard
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/lectures">
									Lectures
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to={`/profile`}>
									Profile
								</NavLink>
							</li>
						</>
					) : (
						<>
							<li className="nav-item">
								<NavLink className="nav-link" to="/">
									Home
								</NavLink>
							</li>

							<li className="nav-item">
								<NavLink className="nav-link" to="/login">
									Login
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to={`/signup`}>
									Signup
								</NavLink>
							</li>
						</>
					)}
				</ul>
			</div>
		</nav>
	);
}

export default Navigation;
