// Navigation.js

import { NavLink } from "react-router-dom";

import "@/global.css";
import { Button } from "@/components/ui/button";

import { useAuth } from "@/hooks";
import { ModeToggle } from "./Mode-toggle";

function Navigation() {
	const { isLoggedIn } = useAuth();

	if (!isLoggedIn) {
		console.log(isLoggedIn);
		console.log("User is not logged in");
	}

	// console.log("isLoggedIn in navigation", isLoggedIn);

	return (
		<nav className="flex w-full p-2 justify-between items-center">
			<NavLink className="" to="/">
				<img className="size-16" src="./assets/logo.jpg" alt="logo" />
			</NavLink>

			<ul className="flex gap-2">
				{isLoggedIn ? (
					<>
						<Button asChild variant="ghost">
							<NavLink to="/dashboard">Dashboard</NavLink>
						</Button>
						<Button asChild variant="ghost">
							<NavLink to="/posts">Lectures</NavLink>
						</Button>
						<Button asChild variant="ghost">
							<NavLink to="/profile">Profile</NavLink>
						</Button>
					</>
				) : (
					<>
						<Button asChild variant="ghost">
							<NavLink to="/">About</NavLink>
						</Button>

						<Button asChild variant="ghost">
							<NavLink to="/login">Login</NavLink>
						</Button>
						<Button asChild variant="ghost">
							<NavLink to="/signup">Signup</NavLink>
						</Button>
					</>
				)}
				<ModeToggle />
			</ul>
		</nav>
	);
}

export default Navigation;
