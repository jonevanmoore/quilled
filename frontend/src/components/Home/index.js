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
    const nbData = Object.values(notebooks)

    const notes = useSelector(state => state.notes.notes)
    const noteData = Object.values(notes)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(notebookActions.fetchNotebooks(userId))
        dispatch(noteActions.fetchNotes(userId))
    }, [dispatch])

    return (
        <>
            <h2>Home</h2>
            <div className="notebooks-notes-container">
                <div className="notebook-div">

                    <h3>Notebooks</h3>

                    <div className='notebooks-squares'>
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

                <div className='notes-div'>
                    <h3 >Notes</h3>
                    <div className="note-squares">

                        {noteData.map(note => {
                            let notebookTitle;
                            nbData.forEach(notebook => {
                                if (note.notebookId === notebook.id) {
                                    notebookTitle = notebook.title
                                }
                            })
                            let notebookTruncate;
                            if (!notebookTitle) {
                                notebookTitle = 'Unassaigned'
                            }
                            if (notebookTitle.length > 25) {
                                notebookTruncate = `${notebookTitle.slice(0, 26)}...`
                            }
                            let titleTruncate;
                            let contentTruncate;
                            if (note.title.length > 32) {
                                titleTruncate = `${note.title.slice(0, 33)}...`
                            } else {
                                titleTruncate = note.title
                            }
                            if (note.content.length > 52) {
                                contentTruncate = `${note.content.slice(0, 53)}...`
                            } else {
                                contentTruncate = note.content
                            }
                            return (
                                <Link key={note.id} to={`/notes/${note.id}`} className="note-link">
                                    <div className="note-link-div">
                                        <span>{titleTruncate}</span>
                                        <span>{contentTruncate}</span>
                                        <span>{note.createdAt}</span>
                                        <span>{note.updatedAt}</span>
                                        <span>Notebook</span>
                                        <span>{notebookTruncate || notebookTitle}</span>
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
