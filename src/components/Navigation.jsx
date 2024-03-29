// Navigation.js

import { NavLink } from "react-router-dom";

import "@/global.css";
import { Button } from "@/components/ui/button";

import { useAuth } from "@/hooks";
import { ModeToggle } from "./Mode-toggle";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { LucideChevronDown, LucideSettings, LogOut } from "lucide-react";

function Navigation() {
	const { isLoggedIn, signout } = useAuth();

	return (
		<nav className="flex w-full p-2 justify-between items-center">
			<NavLink className="" to="/">
				<img className="size-16" src="./assets/learnspherelogo.png" alt="logo" />
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
						<HoverCard openDelay={250}>
							<HoverCardTrigger asChild>
								<Button
									asChild
									variant="ghost"
									className="flex"
								>
									<NavLink
										to="/profile"
										className="group flex gap-2 items-center justify-center"
									>
										<span>Profile</span>
										<LucideChevronDown className="size-4 group-hover:rotate-180 transition-transform duration-300 ease-in-out flex items-center gap-1" />
									</NavLink>
								</Button>
							</HoverCardTrigger>
							<HoverCardContent className="flex w-full gap-2 p-2 flex-col items-center justify-center duration-300">
								<Button
									asChild
									variant="ghost"
									size="sm"
									className="w-full group"
								>
									<slot className="w-full flex justify-between items-center">
										<LucideSettings className="size-4 mr-4 group-hover:rotate-45 duration-300" />
										<NavLink to="/settings">
											Settings
										</NavLink>
									</slot>
								</Button>
								<Button
									variant="destructive"
									className="w-full"
									size="sm"
									onClick={() => signout()}
								>
									<slot className="w-full flex justify-between items-center">
										<LogOut className="size-4 mr-4" />
										<span>Sign Out</span>
									</slot>
								</Button>
							</HoverCardContent>
						</HoverCard>
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
//
