export const validateLoginForm = (values) => {
	const errors = {};
	// const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

	if (!values.username) {
		errors.password = "Username or password is invalid";
	} else if (!values.password) {
		errors.password = "Username or password is invalid";
	} else if (!/^[a-zA-Z0-9]+$/.test(values.username)) {
		errors.password = "Username or password is invalid";
	} else if (!/^[a-zA-Z0-9]+$/.test(values.password)) {
		errors.password = "Username or password is invalid";
	} else if (values.password.length < 4) {
		errors.password = "Username or password is invalid";
	} else if (values.password.length > 10) {
		errors.password = "Username or password is invalid";
	}

	return errors;
};

export const validateSignupForm = (values) => {
	
	const errors = {};
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
	if (!values.username) {
		errors.username = "Username is required!";
	} else if (!/^[a-zA-Z0-9]+$/.test(values.username)) {
		errors.username = "Username must contain only letters and numbers";
	}

	if (!values.password) {
		errors.password = "Password is required";
	} else if (!/^[a-zA-Z0-9]+$/.test(values.password)) {
		errors.password = "Password must contain only letters and numbers";
	} else if (values.password.length < 4) {
		errors.password = "Password must be more than 4 characters";
	} else if (values.password.length > 10) {
		errors.password = "Password cannot exceed more than 10 characters";
	}

	if (values.password !== values.confirmPassword) {
		errors.confirmPassword = "Those passwords didn’t match. Try again.";
	}
	
	return errors;
};
