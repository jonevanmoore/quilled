import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useHistory, useParams } from 'react-router-dom';
import * as notebooksActions from '../../store/notebooks'
import * as notesActions from '../../store/notes'
import './IndieNotebook.css'

export default function IndieNotebook() {
    const dispatch = useDispatch()
    const history = useHistory()


    const { notebookId } = useParams()
    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id

    const notebook = useSelector(state => state.notebooks.notebooks[notebookId]);

    const notes = useSelector(state => state.notes.notes)
    const noteData = Object.values(notes).reverse()

    const [notebookTitle, setNotebookTitle] = useState(notebook?.title)
    const [titleErrors, setTitleErrors] = useState([])

    useEffect(() => {
        dispatch(notebooksActions.fetchNotebooks(userId))
        dispatch(notesActions.fetchNotes(userId))
    }, [dispatch])

    useEffect(() => {
        const errors = []

        if (notebookTitle?.length > 100) {
            errors?.push('Title must be 100 characters or less')
        } else if (notebookTitle?.length < 5) {
            errors?.push('Title must be at least 5 characters long')
        }
        setTitleErrors(errors)
    }, [notebookTitle])

    const notebookCreateDate = notebook?.createdAt.split('T')[0]
    const notebookCreateMonth = notebookCreateDate?.split('-')[1]
    const notebookCreateDay = notebookCreateDate?.split('-')[2]
    const notebookCreateYear = notebookCreateDate?.split('-')[0]
    function dateInWords() {
        const date = new Date()
        date?.setMonth(notebookCreateMonth - 1)
        return `${date.toLocaleString('en-US', { month: 'long' })} ${notebookCreateDay} ${notebookCreateYear}`
    }
    const notebookUpCreateDate = notebook?.updatedAt.split('T')[0]
    const notebookUpCreateMonth = notebookUpCreateDate?.split('-')[1]
    const notebookUpCreateDay = notebookUpCreateDate?.split('-')[2]
    const notebookUpCreateYear = notebookUpCreateDate?.split('-')[0]
    function dateUpInWords() {
        const date = new Date()
        date?.setMonth(notebookUpCreateMonth - 1)
        return `${date.toLocaleString('en-US', { month: 'long' })} ${notebookUpCreateDay} ${notebookUpCreateYear}`
    }

    const deleteNotes = () => {
        //DELETE ASSOCIATED NOTES AS WELL
        noteData.map(note => {
            const noteId = note.id;
            if (note.notebookId === notebook.id) {
                dispatch(notesActions.destroyNote({
                    userId,
                    id: noteId
                }))
            }
        })
    }

    const deleteNotebook = () => {
        dispatch(notebooksActions.destroyNotebook({
            userId,
            id: notebookId
        }))
        history.push('/')
    }

    const deleteNotesAndNotebook = () => {
        deleteNotes()
        deleteNotebook()
    }

    const editNotebook = () => {
        history.push(`/notebooks/${notebook.id}`)
        dispatch(notebooksActions.editNotebook({
            userId,
            notebookId: notebook.id,
            title: notebookTitle,
        }))
        titleDisplayed()
    }
    const [titleDisplay, setTitleDisplay] = useState('isDisplayed')
    const [editDisplay, setEditDisplay] = useState('notDisplayed')

    const titleDisplayed = () => {
        setTitleDisplay('isDisplayed')
        setEditDisplay('notDisplayed')
    }
    const editDisplayed = () => {
        setEditDisplay('isDisplayed')
        setTitleDisplay('notDisplayed')
    }
    if (notebook?.id !== Number(1)) {
        return (
            <>
                <title>{`Quilled - ${notebook?.title}`}</title>
                {console.log(notebookId)}
                <div className='indieNotebookContainer'>
                    <div className='del-edit-btns'>
                        <button onClick={editDisplayed} id="edit-btn">EDIT</button>
                        <button onClick={deleteNotesAndNotebook}>DELETE</button>
                    </div>
                    <div className='indieTop'>
                        <div className={titleDisplay}>
                            <h2 className='indieNotebookTitle'>{notebook?.title}</h2>
                        </div>
                        <div className={editDisplay}>
                            <ul className='notebook-error'>
                                {titleErrors.map((error, i) => (
                                    <li key={i}>{error}</li>
                                ))}
                            </ul>
                            <input
                                value={notebookTitle}
                                onChange={(e) => setNotebookTitle(e?.target.value)}
                                type="text"
                                className='title-input'
                            >
                            </input>
                            <div className='up-cancel-btns'>
                                <button onClick={editNotebook} disabled={titleErrors?.length > 0}>UPDATE</button>
                                <button onClick={titleDisplayed}>CANCEL</button>
                            </div>
                        </div>
                        <div className='created-updated-indie-div'>
                            <span id='create-updated-indie'>Created on:</span>
                            <span className='indieNotebookCreated'>{dateInWords(notebookCreateMonth)}</span>
                            <span id='create-updated-indie'>Updated on:</span>
                            <span className='indieNotebookCreated'>{dateUpInWords(notebookUpCreateMonth)}</span>
                        </div>
                    </div>

                    <div className='notes-div'>

                        <div className="notes-page-squares">

                            {noteData.map(note => {
                                let notebookTitle;
                                let notebookToNoteId;

                                if (note?.notebookId === notebook?.id) {
                                    notebookTitle = notebook?.title
                                    notebookToNoteId = "notebook-4-title-text"

                                    if (!notebookTitle) {
                                        notebookTitle = 'Unassigned'
                                        notebookToNoteId = 'unassigned'
                                    }
                                    let contentTruncate;

                                    if (note?.content.length > 52) {
                                        contentTruncate = `${note?.content.slice(0, 53)}...`
                                    } else {
                                        contentTruncate = note?.content
                                    }
                                    const createDate = note?.createdAt.split('T')[0]
                                    const createMonth = createDate.split('-')[1]
                                    const createDay = createDate.split('-')[2]
                                    const createYear = createDate.split('-')[0]
                                    function dateInWords() {
                                        const date = new Date()
                                        date.setMonth(createMonth - 1)
                                        return `${date.toLocaleString('en-US', { month: 'long' })} ${createDay} ${createYear}`
                                    }

                                    const updateDate = note?.updatedAt.split('T')[0]
                                    const updateMonth = updateDate.split('-')[1]
                                    const updateDay = updateDate.split('-')[2]
                                    const updateYear = updateDate.split('-')[0]
                                    function updateInWords() {
                                        const date = new Date()
                                        date.setMonth(updateMonth - 1)
                                        return `${date.toLocaleString('en-US', { month: 'long' })} ${updateDay} ${updateYear}`
                                    }
                                    return (
                                        <Link key={note?.id} to={`/notes/${note?.id}`} className="notes-page-link">
                                            <div className="note-link-div">
                                                <div id="note-title-text">
                                                    <span >{note?.title}</span>
                                                    <span id="content-text">{contentTruncate}</span>
                                                </div>
                                                <div id="note-creation">
                                                    <span id="created-at-text">Created on:</span>
                                                    <span id="note-month-text">{dateInWords(createMonth)}</span>
                                                    <span id="updated-at-text">Updated on:</span>
                                                    <span id="note-update-text">{updateInWords(updateMonth)}</span>

                                                </div>

                                            </div>
                                        </Link>
                                    )
                                }
                            })}
                        </div>
                    </div>

                </div>

            </>
        )
    } else {
        //NOTEBOOK ID 1
        return (
            <>
                <title>{`Quilled - ${notebook?.title}`}</title>
                {console.log(notebookId)}
                <div className='indieNotebookContainer'>
                    <div className='del-edit-btns'>
                        <button onClick={editDisplayed} id="edit-btn">EDIT</button>
                    </div>
                    <div className='indieTop'>
                        <div className={titleDisplay}>
                            <h2 className='indieNotebookTitle'>{notebook?.title}</h2>
                            <span id='unassigned-text'>This notebook is for <span id='the-unassigned'>unassiged</span> notes</span>
                        </div>
                        <div className={editDisplay}>
                            <ul className='notebook-error'>
                                {titleErrors.map((error, i) => (
                                    <li key={i}>{error}</li>
                                ))}
                            </ul>
                            <input
                                value={notebookTitle}
                                onChange={(e) => setNotebookTitle(e?.target.value)}
                                type="text"
                                className='title-input'
                            >
                            </input>
                            <div className='up-cancel-btns'>
                                <button onClick={editNotebook} disabled={titleErrors?.length > 0}>UPDATE</button>
                                <button onClick={titleDisplayed}>CANCEL</button>
                            </div>
                        </div>
                    </div>

                    <div className='notes-div'>

                        <div className="notes-page-squares">

                            {noteData.map(note => {
                                let notebookTitle;
                                let notebookToNoteId;

                                if (note?.notebookId === notebook?.id) {
                                    notebookTitle = notebook?.title
                                    notebookToNoteId = "notebook-4-title-text"

                                    if (!notebookTitle) {
                                        notebookTitle = 'Unassigned'
                                        notebookToNoteId = 'unassigned'
                                    }
                                    let contentTruncate;

                                    if (note?.content.length > 52) {
                                        contentTruncate = `${note?.content.slice(0, 53)}...`
                                    } else {
                                        contentTruncate = note?.content
                                    }
                                    const createDate = note?.createdAt.split('T')[0]
                                    const createMonth = createDate.split('-')[1]
                                    const createDay = createDate.split('-')[2]
                                    const createYear = createDate.split('-')[0]
                                    function dateInWords() {
                                        const date = new Date()
                                        date.setMonth(createMonth - 1)
                                        return `${date.toLocaleString('en-US', { month: 'long' })} ${createDay} ${createYear}`
                                    }

                                    const updateDate = note?.updatedAt.split('T')[0]
                                    const updateMonth = updateDate.split('-')[1]
                                    const updateDay = updateDate.split('-')[2]
                                    const updateYear = updateDate.split('-')[0]
                                    function updateInWords() {
                                        const date = new Date()
                                        date.setMonth(updateMonth - 1)
                                        return `${date.toLocaleString('en-US', { month: 'long' })} ${updateDay} ${updateYear}`
                                    }
                                    return (
                                        <Link key={note?.id} to={`/notes/${note?.id}`} className="notes-page-link">
                                            <div className="note-link-div">
                                                <div id="note-title-text">
                                                    <span >{note?.title}</span>
                                                    <span id="content-text">{contentTruncate}</span>
                                                </div>
                                                <div id="note-creation">
                                                    <span id="created-at-text">Created on:</span>
                                                    <span id="note-month-text">{dateInWords(createMonth)}</span>
                                                    <span id="updated-at-text">Updated on:</span>
                                                    <span id="note-update-text">{updateInWords(updateMonth)}</span>

                                                </div>

                                            </div>
                                        </Link>
                                    )
                                }
                            })}
                        </div>
                    </div>

                </div>

            </>
        )
    }
}
