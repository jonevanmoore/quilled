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

    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id

    const note = useSelector(state => state.notes.notes[noteId])

    const notebooks = useSelector(state => state.notebooks.notebooks)
    const nbData = Object.values(notebooks)

    const [noteTitle, setNoteTitle] = useState(note?.title)
    const [noteContent, setNoteContent] = useState(note?.content)
    const [notebookId, setNoteBookId] = useState(note?.notebookId || null)
    const [readBtnColor, setReadBtnColor] = useState('color')
    const [editBtnColor, setEditBtnColor] = useState('no-color')

    useEffect(() => {
        dispatch(notesActions.fetchNotes(userId))
        dispatch(notebooksActions.fetchNotebooks(userId))
    }, [dispatch])

    const deleteNote = () => {
        history.push('/notes')
        dispatch(notesActions.destroyNote({
            userId,
            id: noteId
        }))
    }

    const editNote = () => {
        dispatch(notesActions.editNote({
            userId,
            id: noteId,
            title: noteTitle,
            content: noteContent,
            notebookId: notebookId
        }))
    }

    return (
        <>
            <title>{`Quilled - ${noteTitle}`}</title>
            <div className='indie-note-body'>
                <div className='read-edit-btns'>
                    <button className={`${readBtnColor} read-btn`}>Read</button>
                    <button className={`${editBtnColor} edit-btn`}>Edit</button>
                </div>

                <h2>{note?.title}</h2>
                <h2>{note?.content}</h2>
                <button onClick={deleteNote}>DELETE</button>
                <div className='edit-note-div'>

                    <input
                        type='text'
                        value={noteTitle}
                        onChange={(e) => setNoteTitle(e?.target.value)}
                    >
                    </input>
                    <textarea
                        type='text'
                        value={noteContent}
                        onChange={(e) => setNoteContent(e?.target.value)}
                    >
                    </textarea>
                    <select
                        name='notebookId'
                        value={notebookId}
                        onChange={(e) => setNoteBookId(e?.target.value)}
                    >
                        <option value={0}>None</option>
                        {nbData.map(notebook => {
                            return (
                                <option key={notebook?.id} value={notebook?.id}>{notebook?.title}</option>
                            )
                        })}
                    </select>
                    <button onClick={editNote}>UPDATE</button>
                </div>
            </div>
        </>
    )
}
