import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    let navGreet;
    if (sessionUser) {
        navGreet = `Welcome, ${sessionUser.username}`
        sessionLinks = (
            <>
                <div className='nav-links'>
                    <NavLink to="/notebooks" id='navlink'>Notebooks</NavLink>
                    <NavLink to="/notes" id="navlink">Notes</NavLink>
                </div>
                <div className='user-stuff'>
                    <span>{navGreet}</span>
                    <ProfileButton user={sessionUser} />
                </div>
            </>
        );
    } else {
        navGreet = "Login to get started!"
        sessionLinks = (
            <>
                <span>{navGreet}</span>
                <NavLink to="/login" id='navlink'>Log In</NavLink>
                <NavLink to="/signup" id='navlink'>Sign Up</NavLink>
            </>
        );
    }

    return (
        < ul >
            <li>
                <NavLink exact to="/" id='navlink'>Home</NavLink>
                {isLoaded && sessionLinks}
            </li>
        </ul >
    );
}

export default Navigation;
