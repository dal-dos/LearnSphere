import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import './AuthForm.css';
function Login() {

    const initialValues = {
        username: "",
        password: "",
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
        if (Object.keys(formErrors).length === 0) {
            console.log(formValues);
            try {
                const response = await fetch('https://login-service-dot-project-416223.uw.r.appspot.com/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formValues),
                });
        
                if (!response.ok) {
                    throw new Error('Failed to authenticate');
                }
        
                // Assuming the response contains a JSON object with a success message
                const data = await response.json();
        
                // Check if authentication is successful
                if (data.success) {
                    // Authentication successful, set appropriate state
                    setIsSubmit(true);
                } else {
                    // Authentication failed, set error message
                    setFormErrors({ password: "Username or password is invalid" });
                }
            } catch (error) {
                console.error('Error:', error.message);
                // Handle error here
                // For example, set a general error message
                setFormErrors({ password: "An error occurred while logging in" });
            }
        }
        

        // if(false){ //if username and password are not correct.
        //     setIsSubmit(true);
        // }
        
        //submit goes here
        
        //https://auth-service-dot-project-416223.uw.r.appspot.com/

        //fetch get post data etc.
        //axios  alternate fetch.
        //post request (for login)

        //to check if acc exists, (not done yet). signup auth service will respond to react. object will be recieved to react, true or false based on success and message to display.
        
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

    return (
        <>
            <div></div>
            <div className="auth-card">
            {Object.keys(formErrors).length === 0 && isSubmit && (
                <div className="ui message success">Signed in successfully</div>
            )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <h1>Login</h1>
                    <div></div>
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
                        <button>Submit</button>
                    </div>
                </form>
                <div className="text">
                    Don't have an account? <Link to={`/signup/`}>Sign up</Link>
                </div>
            </div>{" "}
        </>
    );
}

export default Login;