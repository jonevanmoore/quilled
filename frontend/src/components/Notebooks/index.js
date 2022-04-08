import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useHistory } from 'react-router-dom';
import './Notebooks.css'

import * as notebooksActions from '../../store/notebooks'
import * as noteActions from '../../store/notes'

export default function Notebooks() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [notebookList, setNotebooklist] = useState([])

    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id

    const notebooks = useSelector(state => state.notebooks.notebooks);
    const nbData = Object.values(notebooks)

    const notes = useSelector(state => state.notes.notes)
    const noteData = Object.values(notes)

    useEffect(() => {
        dispatch(notebooksActions.fetchNotebooks(userId))
        dispatch(noteActions.fetchNotes(userId))
    }, [dispatch])

    const newNotebook = () => {
        dispatch(notebooksActions.createNotebook(userId))
    }

    return (
        <>
            <div className='notebooks-page-container'>

                <title>Quilled - My Notebooks</title>
                <div className='top-notebook-container'>
                    <h2 id="notebooks-text">Notebooks</h2>
                    <button onClick={newNotebook} className="create-book-btn">CREATE NOTEBOOK</button>
                </div>
                <div className='notebooks-page-squares'>
                    {nbData.map(notebook => {
                        let noteCount = 0
                        noteData.forEach(note => {
                            if (note.notebookId === notebook.id) {
                                noteCount += 1
                            }
                        })
                        return (
                            <Link key={notebook.id} to={`/notebooks/${notebook.id}`} className="notebook-link">
                                <div className="notebook-link-div">
                                    <div className="notebook-data">
                                        <span>{notebook.title}</span>
                                        <span>{notebook.createdAt}</span>
                                        <span>{notebook.updatedAt}</span>
                                        <span>{`${noteCount} Notes`}</span>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                    }
                </div>
            </div>
        </>
    )
}
