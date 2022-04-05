import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useHistory } from 'react-router-dom';

import * as notesActions from '../../store/notes'

const Notes = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user)
    const userId = sessionUser.id

    const notes = useSelector(state => state.notes.notes)
    const notesData = Object.values(notes)

    useEffect(() => {
        dispatch(notesActions.fetchNotes(userId))
    }, [dispatch])

    return (
        <>
            <title>Quilled - My Notes</title>
            <h2>Notes</h2>
            <ul>
                {notesData.map((note) => (
                    <>
                        <li key={note.id}>{note.title}</li>
                        <span>{note.content}</span>
                    </>
                ))}
            </ul>
        </>
    )
}

export default Notes
