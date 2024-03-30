import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function Home() {
	return (
		<section className="flex h-full w-full flex-col items-center justify-center gap-16">
			<img
				src="./assets/learnspherelogo-text.png"
				alt="LearnSphere Logo"
				className="w-56"
			/>
			<Button asChild>
				<Link to="/dashboard">Explore Courses</Link>
			</Button>
		</section>
	);
}

export default Home;
