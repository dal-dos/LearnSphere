import React from "react";
import { useProfile } from "@/hooks";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FormHeading from "@/components/FormHeading";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import "@/global.css";

function Dashboard() {
	const { profile } = useProfile();

	return (
		<div className="mx-auto max-w-4xl p-5">
			<FormHeading>Welcome to LearnSphere, {profile?.name}!</FormHeading>
			<Card className="mb-6 rounded-lg p-6 text-center shadow">
				<CardDescription>
					Explore a world of knowledge and enhance your learning
					experience with LearnSphere.
				</CardDescription>
			</Card>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				{/* Dashboard Cards */}
				<Card className="rounded-lg p-6 text-center shadow">
					<CardTitle>Your Courses</CardTitle>
					<CardDescription>
						Resume learning where you left off.
					</CardDescription>
					<Link to="/lectures/">
						<Button className="mt-4">Go to Courses</Button>
					</Link>
				</Card>

				<Card className="rounded-lg p-6 text-center shadow">
					<CardTitle>Completed Courses</CardTitle>
					<CardDescription>
						View the courses you've completed and access your
						certificates.
					</CardDescription>
					<Button className="mt-4">View Certificates</Button>
				</Card>

				<Card className="rounded-lg p-6 text-center shadow">
					<CardTitle>Calendar & Deadlines</CardTitle>
					<div className="calendar-mini">[Mini Calendar]</div>
					<div className="upcoming-deadlines mt-4">
						<h3>Upcoming Deadlines</h3>
						<p>[List of deadlines]</p>
					</div>
				</Card>

				<Card className="rounded-lg p-6 text-center shadow">
					<CardTitle>New Resources</CardTitle>
					<CardDescription>
						Discover new courses, videos, and articles to further
						your education.
					</CardDescription>
					<Button className="mt-4">Explore Resources</Button>
				</Card>

				<Card className="rounded-lg p-6 text-center shadow">
					<CardTitle>Progress Tracking</CardTitle>
					<CardDescription>
						View your learning progress across all courses.
					</CardDescription>
					<Button className="mt-4">View Progress</Button>
				</Card>
			</div>
		</div>
	);
}

export default Dashboard;
