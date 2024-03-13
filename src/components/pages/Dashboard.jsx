import "../styles/Dashboard.css";
import { useProfile } from "../../contexts/profile";
import { useEffect } from "react";

function Dashboard() {
	const { user } = useProfile();
	//test
	console.log("user in dashboard is ", user);
	return (
		<div className="dashboard-container">
			<div className="dashboard-header">
				<h1>Welcome to LearnSphere, {user?.username}!</h1>
				<p>
					Explore a world of knowledge and enhance your learning
					experience with LearnSphere.
				</p>
			</div>
			<div className="dashboard-main">
				<div className="dashboard-card">
					<h2>Your Courses</h2>
					<p>Resume learning where you left off.</p>
					<button>Go to Courses</button>
				</div>
				<div className="dashboard-card">
					<h2>Completed Courses</h2>
					<p>
						View the courses you've completed and access your
						certificates.
					</p>
					<button>View Certificates</button>
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
					<button>Explore Resources</button>
				</div>
				<div className="dashboard-card">
					<h2>Progress Tracking</h2>
					<p>View your learning progress across all courses.</p>
					<button>View Progress</button>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
