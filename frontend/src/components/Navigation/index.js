import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from '../static/images/quilled.png';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    let navGreet;
    if (sessionUser) {
        navGreet = `Welcome, ${sessionUser.username}`
        return (
            <div className="nav-div">
                <div className='user-stats' id='nav-el'>
                    <span >{navGreet}</span>
                    <div id='stats'>
                        <span>4 notebooks</span>
                        <span>20 notes</span>
                    </div>
                </div>
                <div className='nav-links' id='nav-el'>
                    <NavLink to="/notebooks" id='navlink'>Notebooks</NavLink>
                </div>
                <div className="logo-div" id='nav-el'>
                    <NavLink to='/' className='logo-link'><img src={logo} className="logo-letters" /></NavLink>
                    {isLoaded && sessionLinks}
                </div >
                <div id='nav-el'>
                    <NavLink to="/notes" id="navlink">Notes</NavLink>
                </div>
                <div className='user-stuff' id='nav-el'>
                    <ProfileButton user={sessionUser} />
                </div>
            </div>
        );
    } else {
        return (
            <div className="nav-div">
                <NavLink to='/' className='logo-link'><img src={logo} className="logo-letters" /></NavLink>
                {isLoaded && sessionLinks}
            </div >
        );
    }
}

export default Navigation;
