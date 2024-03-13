import { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom'
function Signup() {
    const navigate = useNavigate();
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

    const toggle = () => {
      setVisible(!isVisible);
    };
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    
        // if (isSubmit) {
        //     console.log(formValues);
        //     try {
        //         const response = await fetch('https://login-service-dot-project-416223.uw.r.appspot.com/', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //             body: JSON.stringify({
        //                 username: formValues.username,
        //                 password: formValues.password,
        //                 role: formValues.role,
        //             }),
        //         });
    
        //         if (!response.ok) {
        //             throw new Error('Failed to send data');
        //         }
    
        //         // Handle success response here
        //         console.log('Data sent successfully');
        //     } catch (error) {
        //         console.error('Error:', error.message);
        //         // Handle error here
        //     }
        // }
        
    };

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
            
        }
    }, [formErrors, formValues, isSubmit]);
    const validate = (values) => {
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

    return (
        <>
            
            <div className="auth-card">
            {Object.keys(formErrors).length === 0 && isSubmit && (
                <div className="ui message success">Sign up successful</div>
            )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <h1>Sign Up</h1>
                    <div className="ui divider"></div>
                    <div className="field">
                        <label>Account Type</label>
                        <select name="role" value={formValues.role}  onChange={handleChange}>
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

                        <button type="submit" disabled={Object.keys(formErrors).length === 0 && isSubmit}>
                            Submit
                        </button>
                    </div>
                    
                </form>
                <div className="text">
                    Already have an account? <Link to={`/login/`}><span>Log in</span></Link>
                </div>
            </div>{" "}
        </>
    );
}

export default Signup;