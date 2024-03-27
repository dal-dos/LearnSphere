// TODO: UPDATE THE MICROSERVICE URLS HERE ( WITHOUT THE TRAILING SLASH )

// export const POSTS_BASE_URL = "http://localhost:8080/api/post-service";
// export const AUTH_BASE_URL = "http://localhost:8090/api/auth-service";
// export const PROFILE_BASE_URL = "http://localhost:8100/api/profile-service";

export const PROFILE_BASE_URL =
	"https://profile-service-dot-learn-sphere-3.uc.r.appspot.com/api/profile-service";
export const AUTH_BASE_URL =
	"https://auth-service-dot-learn-sphere-3.uc.r.appspot.com/api/auth-service";
export const POSTS_BASE_URL =
	"https://post-service-dot-learn-sphere-3.uc.r.appspot.com/api/post-service";

export const CORS_CONFIG = {
	"Content-Type": "application/json;charset=UTF-8",
	"Access-Control-Allow-Origin": "*",
};
export const PROFILE_CORS_CONFIG = {
	"Content-Type": "application/json;charset=UTF-8",
	"Access-Control-Allow-Origin": "http://localhost:8100",
	"Access-Control-Allow-Credentials": "true",
};
