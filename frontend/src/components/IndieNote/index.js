import React, { useState, useEffect } from 'react';
import { Redirect, Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as notesActions from '../../store/notes'

export default function IndieNote() {
    const dispatch = useDispatch()
    const history = useHistory()

    const { noteId } = useParams()

    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id

    const note = useSelector(state => state.notes.notes[noteId])

    useEffect(() => {
        dispatch(notesActions.fetchNotes(userId))
    }, [dispatch])

    const deleteNote = () => {
        history.push('/notes')
        dispatch(notesActions.destroyNote({
            userId,
            id: noteId
        }))
    }

    return (
        <>
            <h2>Indie Note</h2>
            <h2>{note?.title}</h2>
            <h2>{note?.content}</h2>
            <button onClick={deleteNote}>DELETE</button>
        </>
    )
}
