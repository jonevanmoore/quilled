import React, { useState, useEffect } from "react";
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useHistory } from 'react-router-dom';
import * as notebookActions from '../../store/notebooks'
import * as noteActions from '../../store/notes'
import './Home.css'

export default function Home() {

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
            <title>Quilled - Home</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Gothic+A1:wght@100;200&family=Open+Sans:wght@300;400&family=Oswald:wght@200&family=Roboto&display=swap');
            </style>
            <div className="notebooks-notes-container">
                <h2 id="home-text">Home</h2>
                <div className="notebook-div">

                    <div id="notebook-buttons">
                        <h3>Notebooks</h3>
                        <button onClick={newNotebook} id="plus-btn">+</button>
                    </div>

                    <div className='notebooks-squares'>
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
                                <Link key={notebook.id} to={`/notebooks/${notebook.id}`} className="notebook-link">
                                    <div className="notebook-link-div">
                                        <div className="notebook-data">
                                            <span id="title-text">{notebook.title}</span>
                                            <div id="creation">
                                                <span id="created-at-text">Created on:</span>
                                                <span id="month-text">{dateInWords(createMonth)}</span>
                                                <span id="updated-at-text">Updated on:</span>
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

                <div className='notes-div'>
                    <div id="notebook-buttons">
                        <h3>Notes</h3>
                        <button onClick={newNote} id="plus-btn">+</button>
                    </div>
                    <div className="note-squares">

                        {noteData.map(note => {
                            let notebookTitle;
                            let notebookToNoteId;
                            nbData.forEach(notebook => {
                                if (note.notebookId === notebook.id) {
                                    notebookTitle = notebook.title
                                    notebookToNoteId = "notebook-4-title-text"
                                }
                            })
                            if (!notebookTitle) {
                                notebookTitle = 'Unassigned'
                                notebookToNoteId = 'unassigned'
                            }
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
                                <Link key={note.id} to={`/notes/${note.id}`} className="note-link">
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
