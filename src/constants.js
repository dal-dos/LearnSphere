// TODO: UPDATE THE MICROSERVICE URLS HERE ( WITHOUT THE TRAILING SLASH )

export const POSTS_BASE_URL = "http://localhost:8080";
export const AUTH_BASE_URL = "http://localhost:8090";
export const PROFILE_BASE_URL = "http://localhost:8100";

// export const PROFILE_BASE_URL = "https://profile-service-dot-project-416223.uw.r.appspot.com";
// export const AUTH_BASE_URL = "https://auth-service-dot-project-416223.uw.r.appspot.com";
// export const POSTS_BASE_URL = "https://post-service-dot-project-416223.uw.r.appspot.com";

export const CORS_CONFIG = {
	"Content-Type": "application/json;charset=UTF-8",
	"Access-Control-Allow-Origin": "*",
};

const auth_headers = new Headers();
export function getAuthHeaders() {
	auth_headers.append("Content-Type", "application/json;charset=UTF-8");
	auth_headers.append("Access-Control-Allow-Origin", "http://localhost:8090");
	auth_headers.append("Access-Control-Allow-Credentials", "true");

	return auth_headers;
}
export function appendAuthHeaders(key, value) {
	auth_headers.append(key, value);
	return auth_headers;
}
