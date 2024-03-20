import { useContext } from "react";

import { ProfileContext } from "../contexts/profile";
import { AuthContext } from "../contexts/auth";
import { PostsContext } from "../contexts/posts";
import { ThemeProviderContext } from "../contexts/theme";

function useProfile() {
	return useContext(ProfileContext);
}
function useAuth() {
	return useContext(AuthContext);
}
function usePosts() {
	return useContext(PostsContext);
}
function useTheme() {
	return useContext(ThemeProviderContext);
}
export { useProfile, useAuth, usePosts, useTheme };
