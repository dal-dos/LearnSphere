import { useState, useEffect } from "react";
import { validateSignupForm } from "../../utils";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { redirect } from "react-router-dom";

function Signup() {
	const initialValues = {
		username: "",
		password: "",
		confirmPassword: "",
		role: "student",
	};
	const [formValues, setFormValues] = useState(initialValues);
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	const [isVisible, setVisible] = useState(false);
	const { signup } = useAuth();

	const toggle = () => {
		setVisible(!isVisible);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFormErrors(validateSignupForm(formValues));
		setIsSubmit(true);

		if (Object.keys(formErrors).length === 0 && isSubmit) {
			console.log(formValues);
			const res = await signup(formValues);

			if (res.success) {
				redirect("/dashboard");
			} else {
				alert(res.message);
			}
		}

		setIsSubmit(false);
	};

	useEffect(() => {
		console.log(formErrors);
		if (Object.keys(formErrors).length === 0 && isSubmit) {
			console.log(formValues);
		}
	}, [formErrors, formValues, isSubmit]);

	return (
		<div className="auth-card">
			{Object.keys(formErrors).length === 0 && isSubmit && (
				<div className="ui message success">Sign up successful</div>
			)}

			<form onSubmit={handleSubmit} className="auth-form">
				<h1>Sign Up</h1>
				<div className="ui divider"></div>
				<div className="field">
					<label>Account Type</label>
					<select
						name="role"
						value={formValues.role}
						onChange={handleChange}
					>
						<option value="student">Student</option>
						<option value="teacher">Teacher</option>
						<option value="admin">Admin</option>
					</select>
				</div>
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
						<button type="button" onClick={toggle}>
							{isVisible ? "Show" : "Hide"}
						</button>
						<input
							type={isVisible ? "text" : "password"}
							name="password"
							placeholder="Password"
							value={formValues.password}
							onChange={handleChange}
						/>
					</div>
					<p className="error-text">{formErrors.password}</p>

					<div className="field">
						<label>Confirm Password</label>
						<input
							type={isVisible ? "text" : "password"}
							name="confirmPassword"
							placeholder="Confirm password"
							value={formValues.confirmPassword}
							onChange={handleChange}
						/>
					</div>
					<p>{formErrors.confirmPassword}</p>

					<button
						type="submit"
						disabled={
							Object.keys(formErrors).length === 0 && isSubmit
						}
					>
						Submit
					</button>
				</div>
			</form>
			<div className="text">
				Already have an account?{" "}
				<Link to={`/login/`}>
					<span>Log in</span>
				</Link>
			</div>
		</div>
	);
}

export default Signup;
