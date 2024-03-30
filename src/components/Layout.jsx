import { Outlet } from "react-router-dom";

export default function Layout() {
	return (
		<div className="p-4 h-[calc(100dvh-96px)] w-[100dvw]">
			<Outlet />
		</div>
	);
}
