//App.jsx
import { Routes, Route } from "react-router-dom";

import Home from "@/pages/LandingPage.jsx";
import Dashboard from "@/pages/Dashboard.jsx";
import Profile from "@/pages/Profile.jsx";
import NotFound from "@/pages/NotFound";

import AllPosts from "@/pages/post/AllPosts.jsx";
import AddPost from "@/pages/post/AddPost.jsx";
import EditPost from "@/pages/post/EditPost.jsx";
import Post from "@/pages/post/Post.jsx";

import Login from "@/pages/auth/Login.jsx";
import Signup from "@/pages/auth/Signup.jsx";
import Unauthorized from "@/pages/auth/Unauthorized";

import Layout from "@/components/Layout.jsx";
import Navigation from "@/components/Navigation.jsx";
import RequireAuth from "@/components/Require-Auth";
import { Outlet } from "react-router-dom";

import "@/global.css";
function App() {
	return (
		<>
			<Navigation />
			<Routes>
				<Route path="/" element={<Layout />}>
					{/* Public Routes */}
					<Route path="/" element={<Home />} />
					<Route path="login" element={<Login />} />
					<Route path="signup" element={<Signup />} />
					<Route path="unauthorized" element={<Unauthorized />} />

					{/* Private Routes */}
					<Route element={<RequireAuth />}>
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="profile" element={<Profile />} />
						<Route path="posts" element={<Outlet />}>
							<Route index element={<AllPosts />} />
							<Route path="add" element={<AddPost />} />
							<Route path=":postSlug">
								<Route index element={<Post />} />
								<Route path="edit" element={<EditPost />} />
							</Route>
						</Route>
					</Route>

					{/* 404 */}
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
