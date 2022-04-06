import React, { useState, useEffect } from 'react';
import { Redirect, Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as notesActions from '../../store/notes'

export default function IndieNote() {

    const { noteId } = useParams()

    const note = useSelector(state => state.notes.notes[noteId])

    return (
        <>
            <h2>Indie Note</h2>
            <h2>{note.title}</h2>
            <h2>{note.content}</h2>
            <button>DELETE</button>
        </>
    )
}
