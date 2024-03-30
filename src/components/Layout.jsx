import { Outlet } from "react-router-dom";

export default function Layout() {
	return (
		<div className="h-[calc(100dvh-96px)] w-[100dvw] p-4">
			<Outlet />
		</div>
	);
}
