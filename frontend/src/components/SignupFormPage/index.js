import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css'
import logo from '../static/images/quilled-logo.png';
import * as usersActions from '../../store/users';

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    const users = useSelector(state => state.users.users)
    const userObject = Object.values(users)

    const usernameList = []
    const emailList = []
    userObject.forEach(user => {
        usernameList.push(user.username)
        emailList.push(user.email)
    })

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    //VALIDATIONS
    const [emailAvail, setEmailAvail] = useState('invalid')
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const [usernameAvail, setUsernameAvail] = useState('invalid')
    const [usernameLength, setUsernameLength] = useState('invalid')
    const [passwordVal, setPasswordVal] = useState('invalid')
    const [confirmVal, setConfirmVal] = useState('invalid')
    const [btnClass, setBtnClass] = useState('disabled-btn')

    //USERNAME VALIDATION
    useEffect(() => {
        //EMAIL
        if (!emailList.includes(email) && validateEmail(email)) {
            setEmailAvail('valid')
        } else {
            setEmailAvail('invalid')
        }
        if (email.length < 100 && email.length > 6) {
            setEmailAvail('valid')
        } else {
            setEmailAvail('invalid')
        }

        //USERNAME
        if (!usernameList.includes(username)) {
            setUsernameAvail('valid')
        } else {
            setUsernameAvail('invalid')
        }
        if (username.length > 5 && username.length < 30) {
            setUsernameLength('valid')
        } else {
            setUsernameLength('invalid')
            setUsernameAvail('invalid')
        }

        //PASSWORD
        if (password.length > 7) {
            setPasswordVal('valid')
        } else {
            setPasswordVal('invalid')
        }

        //CONFIRM
        if (confirmPassword === password && confirmPassword.length > 0) {
            setConfirmVal('valid')
        } else {
            setConfirmVal('invalid')
        }

        //BTN Disabled
        if (!emailList.includes(email) && validateEmail(email) && !usernameList.includes(username) && username.length > 5 && username.length < 30 && password.length > 7 && confirmPassword === password && confirmPassword.length > 0) {
            setBtnClass('able-btn')
        } else {
            setBtnClass('disabled-btn')
        }

    }, [username, email, password, confirmPassword])

    useEffect(() => {
        dispatch(usersActions.fetchUsers(users))
    }, [dispatch])

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
                    <ul className="validators">
                        <li className='single-avail-text avail-text'><i className="fa-solid fa-circle-check" id={emailAvail}></i> email available</li>
                    </ul>
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
                    <ul className="validators user-vals">
                        <li className='avail-text username-auth'><i className="fa-solid fa-circle-check" id={usernameAvail}></i> username available</li>
                    </ul>
                    <label>
                        <i className="fa-solid fa-lock input-icon"></i>
                    </label>
                    <input
                        className="signup-input pass-input"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <ul className="validators">
                        <li className="avail-text pass-avail-text"><i className="fa-solid fa-circle-check" id={passwordVal}></i> min. 8 charcaters</li>
                    </ul>
                    <label>
                        <i className="fa-solid fa-unlock input-icon"></i>
                    </label>
                    <input
                        className="signup-input pass-input"
                        placeholder="Confirm Pasword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <ul className="validators">
                        <li className="avail-text pass-con-avail-text"><i className="fa-solid fa-circle-check" id={confirmVal}></i> matches password</li>
                    </ul>
                    <button
                        type="submit"
                        className={btnClass}
                        disabled={btnClass !== 'able-btn'}
                    >
                        SIGN UP</button>
                </form>
            </div>
        </div>
    );
}

export default SignupFormPage;
