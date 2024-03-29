// Home.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import "@/global.css";

function Home() {
	return (
		<>
			<section className="h-[100dvh] flex items-start justify-center">
				<div className="pt-32 text-center space-y-8">
				<img src="./assets/learnspherelogo-text.png" alt="LearnSphere Logo" className="w-64 h-auto mx-auto mb-8" />
					<h1 className="text-5xl font-bold tracking-tight">
						Welcome
					</h1>

					<Button className="hero-cta" asChild>
						<Link to="/dashboard">Explore Courses</Link>
					</Button>
				</div>
			</section>
		</>
	);
}

export default Home;
