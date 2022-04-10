import React, { useState, useEffect } from 'react';
import { Redirect, Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './IndieNote.css'

import * as notesActions from '../../store/notes'
import * as notebooksActions from '../../store/notebooks'

export default function IndieNote() {
    const dispatch = useDispatch()
    const history = useHistory()

    const { noteId } = useParams()

    const sessionUser = useSelector(state => state?.session?.user);
    const userId = sessionUser?.id

    const note = useSelector(state => state?.notes?.notes[noteId])

    const notebooks = useSelector(state => state?.notebooks?.notebooks)
    const nbData = Object?.values(notebooks)

    const [noteTitle, setNoteTitle] = useState(note?.title)
    const [noteContent, setNoteContent] = useState(note?.content)
    const [notebookId, setNoteBookId] = useState(note?.notebookId || null)
    const [notebookText, setNotebookText] = useState(notebooks[note?.notebookId]?.title)
    const [noteErrors, setNoteErrors] = useState([])


    useEffect(() => {
        dispatch(notesActions?.fetchNotes(userId))
        dispatch(notebooksActions?.fetchNotebooks(userId))
    }, [dispatch])

    useEffect(() => {
        const errors = []

        if (noteTitle?.length > 100) {
            errors?.push('Title must be 100 characters or less')
        } else if (noteTitle?.length < 5) {
            errors?.push('Title must be at least 5 characters long')
        }
        setNoteErrors(errors)
    }, [noteTitle])

    const deleteNote = () => {
        history?.push('/notes')
        dispatch(notesActions?.destroyNote({
            userId,
            id: noteId
        }))
    }


    const noteCreateDate = note?.createdAt?.split('T')[0]
    const noteCreateMonth = noteCreateDate?.split('-')[1]
    const noteCreateDay = noteCreateDate?.split('-')[2]
    const noteCreateYear = noteCreateDate?.split('-')[0]
    function dateInWords() {
        const date = new Date()
        date?.setMonth(noteCreateMonth - 1)
        return `${date.toLocaleString('en-US', { month: 'long' })} ${noteCreateDay} ${noteCreateYear}`
    }
    const noteUpCreateDate = note?.updatedAt?.split('T')[0]
    const noteUpCreateMonth = noteUpCreateDate?.split('-')[1]
    const noteUpCreateDay = noteUpCreateDate?.split('-')[2]
    const noteUpCreateYear = noteUpCreateDate?.split('-')[0]
    function dateUpInWords() {
        const date = new Date()
        date?.setMonth(noteUpCreateMonth - 1)
        return `${date?.toLocaleString('en-US', { month: 'long' })} ${noteUpCreateDay} ${noteUpCreateYear}`
    }



    const readDisplayed = () => {
        setReadDisplay('isDisplayed')
        setEditDisplay('notDisplayed')
        setReadBtnColor('color')
        setEditBtnColor('no-color')
    }
    const editDisplayed = () => {
        setEditDisplay('isDisplayed')
        setReadDisplay('notDisplayed')
        setEditBtnColor('color')
        setReadBtnColor('no-color')
    }

    const [readBtnColor, setReadBtnColor] = useState('color')
    const [editBtnColor, setEditBtnColor] = useState('no-color')

    const [readDisplay, setReadDisplay] = useState('isDisplayed')
    const [editDisplay, setEditDisplay] = useState('notDisplayed')




    const editNote = () => {
        dispatch(notesActions?.editNote({
            userId,
            id: noteId,
            title: noteTitle,
            content: noteContent,
            notebookId: notebookId
        }))

        setNotebookText(notebooks[note?.notebookId]?.title)
        readDisplayed()
    }


    return (
        <>
            <title>{`Quilled - ${noteTitle}`}</title>
            <div className='indie-note-body'>
                <div className='read-edit-btns'>
                    <button className={`${readBtnColor} read-btn`} onClick={readDisplayed}>Read</button>
                    <button className={`${editBtnColor} edit-btn`} onClick={editDisplayed}>Edit</button>
                </div>
                <div className={`read-note-div ${readDisplay}`}>
                    <div id='lean-left'>
                        <h2 className='note-title'>{note?.title}</h2>
                        <div className='created-updated-indie-note-div'>
                            <span id='create-updated-note-indie'>Created on:</span>
                            <span className='indieNoteCreated'>{dateInWords(noteCreateMonth)}</span>
                            <span id='create-updated-note-indie'>Updated on:</span>
                            <span className='indieNoteCreated'>{dateUpInWords(noteUpCreateMonth)}</span>
                            <span id='divider'> | </span>
                            <span id='create-updated-note-indie'> Notebook: </span>
                            {/* {nbData.map(notebook => {
                                let notebookText;
                                if (notebook?.id === note?.notebookId) {
                                    notebookText = notebook?.title
                                }
                                return (
                                    )
                                })} */}
                            <Link className='indieNoteCreatedLink' to={`/notebooks/${notebooks[note?.notebookId]?.title}`}>{notebookText}</Link>

                        </div>
                        <div id='content-span'>
                            {note?.content?.split('\n')?.map((par, i) => {
                                return (
                                    <p key={i}>{par}</p>
                                )
                            })}
                            {/* <span>{note?.content}</span> */}
                        </div>
                    </div>

                </div>
                <div className={`${editDisplay}`}>
                    <div className='edit-note-div'>

                        <div className='note-inputs'>
                            <select
                                name='notebookId'
                                value={notebookId}
                                onChange={(e) => setNoteBookId(e?.target?.value)}
                                className='select-notebook'
                            >
                                {/* <option value={0}>None</option> */}
                                {nbData?.map(notebook => {
                                    return (
                                        <option key={notebook?.id} value={notebook?.id || 0}>{notebook?.title}</option>
                                    )
                                })}
                            </select>
                            <ul className='note-errors'>
                                {noteErrors.map((error, i) => (
                                    <li key={i}>{error}</li>
                                ))}
                            </ul>
                            <input
                                type='text'
                                value={noteTitle}
                                onChange={(e) => setNoteTitle(e?.target?.value)}
                                className='note-title-input'
                            >
                            </input>
                            <textarea
                                type='text'
                                value={noteContent}
                                onChange={(e) => setNoteContent(e?.target?.value)}
                                className='note-content-input'
                            >
                            </textarea>
                            <div className='edit-btns'>
                                <button onClick={deleteNote} id='del-can'>DELETE</button>
                                <button onClick={readDisplayed} id='del-can'>CANCEL</button>
                                <button onClick={editNote} id='up-btn' disabled={noteErrors?.length > 0}>UPDATE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
