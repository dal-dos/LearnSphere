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
export const PROFILE_CORS_CONFIG = {
	"Content-Type": "application/json;charset=UTF-8",
	"Access-Control-Allow-Origin": "http://localhost:8100",
	"Access-Control-Allow-Credentials": "true",
};
