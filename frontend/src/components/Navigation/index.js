import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from '../static/images/quilled.png';
import './Navigation.css';
import * as notebooksAction from '../../store/notebooks'
import * as notesAction from '../../store/notes'

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const notebooks = useSelector(state => state.notebooks.notebooks);
    const nbAmount = Object.values(notebooks).length

    const notes = useSelector(state => state.notes.notes)
    const noteAmount = Object.values(notes).length

    const dispatch = useDispatch()

    useEffect(() => {
        if (sessionUser) {
            dispatch(notebooksAction.fetchNotebooks(sessionUser?.id))
            dispatch(notesAction.fetchNotes(sessionUser?.id))
        }
    }, [dispatch])


    let sessionLinks;
    let navGreet;
    if (sessionUser) {

        return (
            <div className="nav-div">
                <div className='user-stats' id='nav-el'>
                    <div className='user-info'>
                        <span>{sessionUser?.username}</span>
                        <span>{sessionUser?.email}</span>
                    </div>
                    <div id='stats'>
                        <span>{`${nbAmount} notebooks`}</span>
                        <span id='note-span'>{`${noteAmount} notes`}</span>
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
