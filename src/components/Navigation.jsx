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
		<nav className="flex w-full items-center justify-between p-2">
			<NavLink className="" to="/">
				<img
					className="size-16"
					src="./assets/learnspherelogo.png"
					alt="logo"
				/>
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
										className="group flex items-center justify-center gap-2"
									>
										<span>Profile</span>
										<LucideChevronDown className="flex size-4 items-center gap-1 transition-transform duration-300 ease-in-out group-hover:rotate-180" />
									</NavLink>
								</Button>
							</HoverCardTrigger>
							<HoverCardContent className="flex w-full flex-col items-center justify-center gap-2 p-2 duration-300">
								<Button
									asChild
									variant="ghost"
									size="sm"
									className="group w-full"
								>
									<slot className="flex w-full items-center justify-between">
										<LucideSettings className="mr-4 size-4 duration-300 group-hover:rotate-45" />
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
									<slot className="flex w-full items-center justify-between">
										<LogOut className="mr-4 size-4" />
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
