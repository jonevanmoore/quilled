import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useHistory } from 'react-router-dom';
import './Notes.css'

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
                <div key={note.id} className="note-div">
                    <div >
                        <Link to={`/notes/${note.id}`} className='note-data'>
                            <div id="title-content">
                                <span id='title'>{note.title}</span>
                                <span id='content'>{note.content}</span>
                                <span className='created-at timestamp'>{note.createdAt}</span>
                                <span className='updated-at timestamp'>{note.updatedAt}</span>
                            </div>
                        </Link>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Notes
