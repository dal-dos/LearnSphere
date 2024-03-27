import "@/global.css";

import { useProfile } from "@/hooks";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FormHeading from "@/components/FormHeading";

function Dashboard() {
	const { profile } = useProfile();

	return (
		<div className="dashboard-container">
			<div className="dashboard-header">
				<FormHeading>
					Welcome to LearnSphere, {profile?.userId}!
				</FormHeading>
				<p>
					Explore a world of knowledge and enhance your learning
					experience with LearnSphere.
				</p>
			</div>
			<div className="dashboard-main">
				<div className="dashboard-card">
					<h2>Your Courses</h2>
					<p>Resume learning where you left off.</p>
					<Link to={`/lectures/`}>
						<Button>Go to Courses</Button>
					</Link>
				</div>
				<div className="dashboard-card">
					<h2>Completed Courses</h2>
					<p>
						View the courses you've completed and access your
						certificates.
					</p>
					<Button>View Certificates</Button>
				</div>
				<div className="dashboard-card calendar-deadlines-panel">
					<h2>Calendar & Deadlines</h2>
					<div className="calendar-mini">[Mini Calendar]</div>
					<div className="upcoming-deadlines">
						<h3>Upcoming Deadlines</h3>
						<p>[List of deadlines]</p>
					</div>
				</div>
				<div className="dashboard-card">
					<h2>New Resources</h2>
					<p>
						Discover new courses, videos, and articles to further
						your education.
					</p>
					<Button>Explore Resources</Button>
				</div>
				<div className="dashboard-card">
					<h2>Progress Tracking</h2>
					<p>View your learning progress across all courses.</p>
					<Button>View Progress</Button>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
