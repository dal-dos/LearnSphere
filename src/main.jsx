import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import {
	AuthProvider,
	ProfileProvider,
	PostsProvider,
	ThemeProvider,
} from "./contexts";
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<ProfileProvider>
					<PostsProvider>
						<ThemeProvider
							defaultTheme="dark"
							storageKey="vite-ui-theme"
						>
							<App />
							<Toaster />
						</ThemeProvider>
					</PostsProvider>
				</ProfileProvider>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>
);
