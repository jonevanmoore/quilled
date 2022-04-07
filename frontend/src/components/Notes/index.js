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
            <div className='top-container'>
                <h2 id='notes-text'>Notes</h2>
                <button onClick={newNote} className='create-note-btn'>CREATE NOTE</button>
            </div>
            <div className='notes-container'>

                {notesData.map((note) => (
                    <Link to={`/notes/${note.id}`} className='note-data'>
                        <div key={note.id} className="note-div">

                            <div id="title-content">
                                <span id='title'>{note.title}</span>
                                <span id='content'>{note.content}</span>
                                <span className='created-at timestamp'>{note.createdAt}</span>
                                <span className='updated-at timestamp'>{note.updatedAt}</span>
                            </div>

                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default Notes
