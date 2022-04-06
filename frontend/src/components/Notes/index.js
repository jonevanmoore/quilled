import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useHistory } from 'react-router-dom';

import * as notesActions from '../../store/notes'
import * as notebooksActions from '../../store/notebooks'

const Notes = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user)
    const userId = sessionUser.id

    const notes = useSelector(state => state.notes.notes)
    const notesData = Object.values(notes)

    const notebooks = useSelector(state => state.notebooks.notebooks);


    useEffect(() => {
        dispatch(notesActions.fetchNotes(userId))
        dispatch(notebooksActions.fetchNotebooks(userId))
    }, [dispatch])

    const newNote = () => {
        dispatch(notesActions.createNote(userId))
    }

    return (
        <>
            <title>Quilled - My Notes</title>
            <h2>Notes</h2>
            <button onClick={newNote}>CREATE NOTE</button>
            {notesData.map((note) => (
                <div key={note.id}>
                    <Link to={`/notes/${note.id}`}>
                        <li >{note.title}</li>
                        <span>{note.content}</span>
                    </Link>
                </div>
            ))}
        </>
    )
}

export default Notes
