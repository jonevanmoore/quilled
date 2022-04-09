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
    const noteData = Object.values(notes)

    const [notebookTitle, setNotebookTitle] = useState(notebook?.title)

    useEffect(() => {
        dispatch(notebooksActions.fetchNotebooks(userId))
        dispatch(notesActions.fetchNotes(userId))
    }, [dispatch])

    const deleteNotebook = () => {
        history.push('/notebooks')
        dispatch(notebooksActions.destroyNotebook({
            userId,
            id: notebookId
        }))
    }

    const editNotebook = () => {
        history.push(`/notebooks/${notebook.id}`)
        dispatch(notebooksActions.editNotebook({
            userId,
            notebookId: notebook.id,
            title: notebookTitle,
        }))
    }
    const notebookCreateDate = notebook.createdAt.split('T')[0]
    const notebookCreateMonth = notebookCreateDate.split('-')[1]
    const notebookCreateDay = notebookCreateDate.split('-')[2]
    const notebookCreateYear = notebookCreateDate.split('-')[0]
    function dateInWords() {
        const date = new Date()
        date.setMonth(notebookCreateMonth - 1)
        return `${date.toLocaleString('en-US', { month: 'long' })} ${notebookCreateDay} ${notebookCreateYear}`
    }

    return (
        <>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Gothic+A1:wght@100;200&family=Open+Sans:wght@300;400&family=Oswald:wght@200&family=Roboto&display=swap');
            </style>
            <title>{`Quilled - ${notebook?.title}`}</title>

            <div className='indieNotebookContainer'>
                <div className='indieTop'>

                    <h2>{notebook?.title}</h2>
                    <h2>{dateInWords(notebookCreateMonth)}</h2>
                </div>

                <div className='notes-div'>

                    <div className="notes-page-squares">

                        {noteData.map(note => {
                            let notebookTitle;
                            let notebookToNoteId;

                            if (note.notebookId === notebook.id) {
                                notebookTitle = notebook.title
                                notebookToNoteId = "notebook-4-title-text"

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
                                    <Link key={note.id} to={`/notes/${note.id}`} className="notes-page-link">
                                        <div className="note-link-div">
                                            <div id="note-title-text">
                                                <span >{note.title}</span>
                                                <span id="content-text">{contentTruncate}</span>
                                            </div>
                                            <div id="note-creation">
                                                <span id="created-at-text">Created at:</span>
                                                <span id="note-month-text">{dateInWords(createMonth)}</span>
                                                <span id="updated-at-text">Updated at:</span>
                                                <span id="note-update-text">{updateInWords(updateMonth)}</span>

                                            </div>

                                        </div>
                                    </Link>
                                )
                            }
                        })}
                    </div>
                </div>




















                <button onClick={deleteNotebook}>DELETE NOTEBOOK</button>



                <label>Title</label>
                <input
                    value={notebookTitle}
                    onChange={(e) => setNotebookTitle(e?.target.value)}
                    type="text"
                >
                </input>
                <button onClick={editNotebook} disabled={notebookTitle?.length < 1}>UPDATE</button>
            </div>

        </>
    )
}
