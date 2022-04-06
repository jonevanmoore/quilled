import React, { useState, useEffect } from 'react';
import { Redirect, Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as notesActions from '../../store/notes'

export default function IndieNote() {
    const dispatch = useDispatch()
    const history = useHistory()

    const { noteId } = useParams()

    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id

    const note = useSelector(state => state.notes.notes[noteId])

    const [noteTitle, setNoteTitle] = useState(note?.title)
    const [noteContent, setNoteContent] = useState(note?.content)

    useEffect(() => {
        dispatch(notesActions.fetchNotes(userId))
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
            content: noteContent
        }))
    }

    return (
        <>
            <title>{`Quilled - ${noteTitle}`}</title>
            <h2>Indie Note</h2>
            <h2>{note?.title}</h2>
            <h2>{note?.content}</h2>
            <button onClick={deleteNote}>DELETE</button>
            <label>EDIT</label>
            <input
                type='text'
                value={noteTitle}
                onChange={(e) => setNoteTitle(e?.target.value)}
            >
            </input>
            <input
                type='text'
                value={noteContent}
                onChange={(e) => setNoteContent(e?.target.value)}
            >
            </input>
            <button onClick={editNote}>UPDATE</button>
        </>
    )
}
