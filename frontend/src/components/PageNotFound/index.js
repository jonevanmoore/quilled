import './PageNotFound.css'
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import * as notebookActions from '../../store/notebooks'
import * as noteActions from '../../store/notes'

export default function PageNotFound() {

    const sessionUser = useSelector(state => state.session.user)
    const userId = sessionUser.id

    const notebooks = useSelector(state => state.notebooks.notebooks)
    const nbData = Object.values(notebooks).reverse()

    const notes = useSelector(state => state.notes.notes)
    const noteData = Object.values(notes).reverse()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(notebookActions.fetchNotebooks(userId))
        dispatch(noteActions.fetchNotes(userId))
    }, [dispatch])

    const newNotebook = () => {
        dispatch(notebookActions.createNotebook(userId))
    }
    const newNote = () => {
        dispatch(noteActions.createNote(userId))
    }

    return (
        <>
            <h1 className='page-not-found'>PAGE NOT FOUND</h1>
            <h2 className='return-home'>Return to <Link to='/' className='home-link'>Home</Link></h2>
        </>
    )
}
