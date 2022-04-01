import React, { useState } from "react";
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import './LoginForm.css'

function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
        <Redirect to="/" />
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    return (
        <body>
            <div className="form-container">

                <form onSubmit={handleSubmit}>
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <div className="login-container">
                        <div className="login-label-div">
                            <label className="login-text">
                                LOGIN
                            </label>
                        </div>
                        <div className="username-input-div">
                            <input
                                className="input-tag"
                                type="text"
                                placeholder="Username/Email"
                                value={credential}
                                onChange={(e) => setCredential(e.target.value)}
                                required
                            />
                        </div>

                        <div className="password-input-div">

                            <input
                                className="input-tag"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="sign-in-btn-div">
                            <button className="btn" type="submit">SIGN IN</button>
                        </div>
                        <div className="go-signup">
                            <text className="sign-up-text">Don't have an account?</text>
                            <Link to="/signup" className="sign-up-link">Sign up</Link>
                        </div>
                    </div>
                </form>
            </div>
        </body >
    );
}

export default LoginFormPage;
