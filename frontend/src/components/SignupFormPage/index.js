import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css'
import logo from '../static/images/quilled-logo.png';

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, password }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };

    return (
        <div className="signup-body">
            <title>Quilled - Sign Up</title>
            <div className="login-link-div">
                <div id="logo-div">
                    <img src={logo} className="logo-sign-pg" />
                </div>
                <div className="welcome-back-div">
                    <h2 id="welcome-back1">Welcome</h2>
                    <h2 id="welcome-back2">Back!</h2>
                </div>
                <div>
                    <p className="mid-text">Login to create more notebooks and jot down your ideas</p>
                </div>
                <Link className="login-btn-link" to='/login'>SIGN IN</Link>
            </div>

            <div className="form-container-sign-up">

                <div className="create-account-div">
                    <h2 id="create-account1">Create</h2>
                    <h2 id="create-account2">Account</h2>
                </div>

                <div className="jon-links">
                    <a href="https://github.com/jonevanmoore/quilled" target="_blank" className="link"> <i className="fa-brands fa-github"></i></a>
                    <a href="https://linkedin.com/in/jonevanmoore" target="_blank" className="link"><i className="fa-brands fa-linkedin-in"></i></a>
                    <a href="mailto:jonevanmoore@yahoo.com" target="_blank" className="link"><i className="fa-solid fa-envelope"></i></a>
                </div>

                <span className="sign-up-reason">Never forget anything again. Sign up now.</span>

                <form onSubmit={handleSubmit} className="form-div">
                    <ul className="err-ul" >
                        {errors.map((error, idx) => <li key={idx} className="err-msg">{error}</li>)}
                    </ul>
                    <label>
                        <i className="fa-solid fa-envelope input-icon"></i>
                    </label>
                    <input
                        className="signup-input"
                        placeholder="Email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label>
                        <i className="fa-solid fa-user input-icon"></i>
                    </label>
                    <input
                        className="signup-input"
                        placeholder="Username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label>
                        <i className="fa-solid fa-lock input-icon"></i>
                    </label>
                    <input
                        className="signup-input"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label>
                        <i className="fa-solid fa-unlock input-icon"></i>
                    </label>
                    <input
                        className="signup-input"
                        placeholder="Confirm Pasword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <button type="submit" className="sign-up-btn">SIGN UP</button>
                </form>
            </div>
        </div>
    );
}

export default SignupFormPage;
