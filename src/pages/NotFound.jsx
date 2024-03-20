import React from "react";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
	return (
		<div className="w-full flex items-center justify-center h-28">
			<span className="text-xl">The Requested Page was not found</span>
			<Button variant="link" asChild>
				<Link to="/">Go back </Link>
			</Button>
		</div>
	);
};

export default NotFound;
