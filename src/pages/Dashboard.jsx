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
        <div className="max-w-4xl mx-auto p-5">
            <FormHeading>Welcome to LearnSphere, {profile?.userId}!</FormHeading>
            <Card className="shadow rounded-lg p-6 mb-6 text-center">
                <CardDescription>
                    Explore a world of knowledge and enhance your learning experience with LearnSphere.
                </CardDescription>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Dashboard Cards */}
                <Card className="shadow rounded-lg p-6 text-center">
                    <CardTitle>Your Courses</CardTitle>
                    <CardDescription>Resume learning where you left off.</CardDescription>
                    <Link to="/lectures/">
                        <Button className="mt-4">Go to Courses</Button>
                    </Link>
                </Card>

                <Card className="shadow rounded-lg p-6 text-center">
                    <CardTitle>Completed Courses</CardTitle>
                    <CardDescription>
                        View the courses you've completed and access your certificates.
                    </CardDescription>
                    <Button className="mt-4">View Certificates</Button>
                </Card>

                <Card className="shadow rounded-lg p-6 text-center">
                    <CardTitle>Calendar & Deadlines</CardTitle>
                    <div className="calendar-mini">[Mini Calendar]</div>
                    <div className="upcoming-deadlines mt-4">
                        <h3>Upcoming Deadlines</h3>
                        <p>[List of deadlines]</p>
                    </div>
                </Card>

                <Card className="shadow rounded-lg p-6 text-center">
                    <CardTitle>New Resources</CardTitle>
                    <CardDescription>
                        Discover new courses, videos, and articles to further your education.
                    </CardDescription>
                    <Button className="mt-4">Explore Resources</Button>
                </Card>

                <Card className="shadow rounded-lg p-6 text-center">
                    <CardTitle>Progress Tracking</CardTitle>
                    <CardDescription>View your learning progress across all courses.</CardDescription>
                    <Button className="mt-4">View Progress</Button>
                </Card>
            </div>
        </div>
    );
}

export default Dashboard;
