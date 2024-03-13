import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/AuthForm.css";

import { validateLoginForm } from "../../utils";
import { useAuth } from "../../contexts/auth";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../contexts/profile";

function Login() {
	const navigate = useNavigate();
	const initialValues = {
		username: "",
		password: "",
	};
	const [formValues, setFormValues] = useState(initialValues);
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	const [isVisible, setVisible] = useState(false);

	const { login } = useAuth();
	const { isLoggedIn, setIsLoggedIn, setUser, getUser } = useProfile();

	useEffect(() => {
		if (Object.keys(formErrors).length !== 0) {
			console.log(formValues);
		}
	}, [formErrors, formValues, isSubmit, isLoggedIn]);

	if (isLoggedIn) {
		navigate("/dashboard");
	}

	const toggle = () => {
		setVisible((x) => !x);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFormErrors(() => validateLoginForm(formValues));
		setIsSubmit(true);
		if (Object.keys(formErrors).length === 0) {
			console.log(formValues);

			const data = await login(formValues);
			if (data.success) {
				console.log("Login successful, redirecting to dashboard...");
				setIsLoggedIn(() => true);
				setUser(() => getUser());
				navigate("/dashboard");
			} else {
				setFormErrors({
					password: "Username or password is invalid",
				});
			}
		}
	};

	return (
		<div className="auth-card">
			{Object.keys(formErrors).length === 0 && isSubmit && (
				<div className="ui message success">Signed in successfully</div>
			)}

			<form onSubmit={handleSubmit} className="auth-form">
				<h1>Login</h1>
				<div>
					<div className="field">
						<label>Username</label>
						<input
							type="text"
							name="username"
							placeholder="Choose a username"
							value={formValues.username}
							onChange={handleChange}
						/>
					</div>
					<p className="error-text">{formErrors.username}</p>
					<div className="field">
						<label>Password</label>

						<input
							type={isVisible ? "text" : "password"}
							name="password"
							placeholder="Password"
							value={formValues.password}
							onChange={handleChange}
						/>
					</div>
					<p className="error-text">{formErrors.password}</p>
					<button
						type="button"
						onClick={(e) => {
							e.preventDefault();
							toggle();
						}}
					>
						{!isVisible ? "Show Password" : "Hide"}
					</button>
					<button type="submit">Submit</button>
				</div>
			</form>
			<div className="text">
				Don't have an account? <Link to={`/signup/`}>Sign up</Link>
			</div>
		</div>
	);
}

export default Login;