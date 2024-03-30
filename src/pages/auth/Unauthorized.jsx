import React from "react";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Unauthorized = () => {
	return (
		<div className="flex h-28 w-full flex-col items-center justify-center">
			<span className="text-xl">
				You are not authorized to access the requested page
			</span>
			<Button variant="link" asChild>
				<Link to="/dashboard">Go to Dashboard</Link>
			</Button>
		</div>
	);
};

export default Unauthorized;
