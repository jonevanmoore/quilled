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
    const noteData = Object.values(notes).reverse()

    const notebooks = useSelector(state => state.notebooks.notebooks);
    const nbData = Object.values(notebooks).reverse()


    useEffect(() => {
        dispatch(notesActions.fetchNotes(userId))
        dispatch(notebooksActions.fetchNotebooks(userId))
    }, [dispatch])

    const newNote = () => {
        dispatch(notesActions.createNote(userId))
    }

    return (
        <>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Gothic+A1:wght@100;200&family=Open+Sans:wght@300;400&family=Oswald:wght@200&family=Roboto&display=swap');
            </style>
            <title>Quilled - My Notes</title>
            <div className='notes-page-div'>

                <div className='top-container'>
                    <h2 id='notes-text'>Notes</h2>
                    <button onClick={newNote} className='create-note-btn'>NEW NOTE</button>
                </div>
                <div className='notes-div'>

                    <div className="notes-page-squares">

                        {noteData.map(note => {
                            let notebookTitle;
                            let notebookToNoteId;
                            nbData.forEach(notebook => {
                                if (note.notebookId === notebook.id) {
                                    notebookTitle = notebook.title
                                    notebookToNoteId = "notebook-4-title-text"
                                }
                            })
                            // if (!notebookTitle) {
                            //     notebookTitle = nbData[0]
                            //     // notebookToNoteId = 'unassigned'
                            // }
                            let contentTruncate;

                            if (note.content.length > 52) {
                                contentTruncate = `${note.content.slice(0, 53)}...`
                            } else {
                                contentTruncate = note.content
                            }
                            const createDate = note.createdAt.split('T')[0]
                            const createMonth = createDate.split('-')[1]
                            const createDay = createDate.split('-')[2]
                            const createYear = createDate.split('-')[0]
                            function dateInWords() {
                                const date = new Date()
                                date.setMonth(createMonth - 1)
                                return `${date.toLocaleString('en-US', { month: 'long' })} ${createDay} ${createYear}`
                            }

                            const updateDate = note.updatedAt.split('T')[0]
                            const updateMonth = updateDate.split('-')[1]
                            const updateDay = updateDate.split('-')[2]
                            const updateYear = updateDate.split('-')[0]
                            function updateInWords() {
                                const date = new Date()
                                date.setMonth(updateMonth - 1)
                                return `${date.toLocaleString('en-US', { month: 'long' })} ${updateDay} ${updateYear}`
                            }
                            return (
                                <Link key={note.id} to={`/notes/${note.id}`} className="notes-page-link">
                                    <div className="note-link-div">
                                        <div id="note-title-text">
                                            <span >{note.title}</span>
                                            <span id="content-text">{contentTruncate}</span>
                                        </div>
                                        <div id="note-creation">
                                            <span id="created-at-text">Created on:</span>
                                            <span id="note-month-text">{dateInWords(createMonth)}</span>
                                            <span id="updated-at-text">Updated on:</span>
                                            <span id="note-update-text">{updateInWords(updateMonth)}</span>

                                        </div>
                                        <span id="notebook-text">Notebook:</span>
                                        <span id={notebookToNoteId}>{notebookTitle}</span>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notes
