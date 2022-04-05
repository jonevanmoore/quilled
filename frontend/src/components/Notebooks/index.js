import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useHistory } from 'react-router-dom';

import * as notebooksActions from '../../store/notebooks'

export default function Notebooks() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [notebookList, setNotebooklist] = useState([])

    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id
    const notebooks = useSelector(state => state.notebooks.notebooks);
    const nbData = Object.values(notebooks)

    useEffect(() => {
        dispatch(notebooksActions.fetchNotebooks(userId))
    }, [dispatch, userId])

    const newNotebook = () => {
        dispatch(notebooksActions.createNotebook(userId))
    }

    return (
        <>
            <title>Quill - My Notebooks</title>
            <h2>Notebooks</h2>
            {nbData.map((notebook) => (
                <div key={notebook.id}>
                    <Link to={`/notebooks/${notebook.id}`}>{notebook.title}</Link>
                </div>
            ))}
            <button onClick={newNotebook}>CREATE NOTEBOOK</button>
        </>
    )
}
