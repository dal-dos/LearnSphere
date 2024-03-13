import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
	Navigation,
	Home,
	Dashboard,
	Profile,
	Login,
	Signup,
	Lectures,
	Posts,
	Post,
} from "../index.js";
import {
	AuthProvider,
	ProfileProvider,
	PostsProvider,
} from "../../contexts/index.js";

import "../styles/App.css";
function App() {
	return (
		<AuthProvider>
			<ProfileProvider>
				<PostsProvider>
					<Router>
						<Navigation />
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/dashboard" element={<Dashboard />} />
							<Route path="/profile" element={<Profile />}>
								<Route path=":postSlug" element={<Profile />} />
							</Route>
							<Route path="/login" element={<Login />} />
							<Route path="/signup" element={<Signup />} />
							<Route path="/lectures" element={<Lectures />}>
								<Route index element={<Posts />} />
								<Route path=":postSlug" element={<Post />} />
							</Route>
						</Routes>
					</Router>
				</PostsProvider>
			</ProfileProvider>
		</AuthProvider>
	);
}

export default App;
