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
    const nbData = Object.values(notebooks).reverse()

    const notes = useSelector(state => state.notes.notes)
    const noteData = Object.values(notes).reverse()

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
                    <button onClick={newNotebook} className="create-book-btn">NEW NOTEBOOK</button>
                </div>
                <div>

                    <div className='notebooks-page-squares'>
                        {nbData.map(notebook => {
                            let noteCount = 0
                            noteData.forEach(note => {
                                if (note.notebookId === notebook.id) {
                                    noteCount += 1
                                }
                            })
                            const createDate = notebook.createdAt.split('T')[0]
                            const createMonth = createDate.split('-')[1]
                            const createDay = createDate.split('-')[2]
                            const createYear = createDate.split('-')[0]
                            function dateInWords() {
                                const date = new Date()
                                date.setMonth(createMonth - 1)
                                return `${date.toLocaleString('en-US', { month: 'long' })} ${createDay} ${createYear}`
                            }

                            const updateDate = notebook.updatedAt.split('T')[0]
                            const updateMonth = updateDate.split('-')[1]
                            const updateDay = updateDate.split('-')[2]
                            const updateYear = updateDate.split('-')[0]
                            function updateInWords() {
                                const date = new Date()
                                date.setMonth(updateMonth - 1)
                                return `${date.toLocaleString('en-US', { month: 'long' })} ${updateDay} ${updateYear}`
                            }
                            return (
                                <Link key={notebook.id} to={`/notebooks/${notebook.id}`} className="notebooks-link">
                                    <div className="notebook-link-div">
                                        <div className="notebook-data">
                                            <span id="title-text">{notebook.title}</span>
                                            <div id="creation">
                                                <span id="created-at-text">Created at:</span>
                                                <span id="month-text">{dateInWords(createMonth)}</span>
                                                <span id="updated-at-text">Updated at:</span>
                                                <span id="update-text">{updateInWords(updateMonth)}</span>
                                            </div>
                                            <span id="note-count-text">{`${noteCount} Notes`}</span>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
