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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);

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
                        <p>{formErrors.username}</p>
                        <div className="field">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formValues.password}
                                onChange={handleChange}
                            />
                        </div>
                        <p>{formErrors.password}</p>
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