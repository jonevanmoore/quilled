import React, { useState } from "react";
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useHistory } from 'react-router-dom';
import './LoginForm.css'
import logo from '../static/images/quilled-logo.png';


function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const history = useHistory()

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

    const demoLogin = async e => {
        e.preventDefault();
        await dispatch(
            sessionActions.login({
                credential: "DougDemodome",
                password: "password",
            })
        );
        return history.push(`/`);
    };

    return (
        <body>
            <title>Quilled - Sign In</title>
            <div className="form-container">

                <form onSubmit={handleSubmit}>
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <div className="login-container">
                        <div id="logo-div">
                            <img src={logo} className="logo" />
                        </div>
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
                        <div className="demo-btn-div">
                            <button className="demo-btn" onClick={demoLogin}>DEMO USER</button>
                        </div>
                        <div className="go-signup">
                            <span className="sign-up-text">Don't have an account?</span>
                            <Link to="/signup" className="sign-up-link">Sign up</Link>
                        </div>
                    </div>
                </form>
            </div>
        </body >
    );
}

export default LoginFormPage;
