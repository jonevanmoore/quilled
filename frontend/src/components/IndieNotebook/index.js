import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useHistory, useParams } from 'react-router-dom';
import * as notebooksActions from '../../store/notebooks'

export default function IndieNotebook() {
    const dispatch = useDispatch()
    const history = useHistory()


    const { notebookId } = useParams()
    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id
    const notebook = useSelector(state => state.notebooks.notebooks[notebookId]);
    const [notebookTitle, setNotebookTitle] = useState(notebook.title)

    useEffect(() => {
        dispatch(notebooksActions.fetchNotebooks(userId))
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

    return (
        <>
            <h2>IndieNOtebook</h2>
            <h2>{notebook.title}</h2>
            <button onClick={deleteNotebook}>DELETE NOTEBOOK</button>

            <label>Title</label>
            <input
                value={notebookTitle}
                onChange={(e) => setNotebookTitle(e.target.value)}
                type="text"
            >
            </input>
            <button onClick={editNotebook}>UPDATE</button>

        </>
    )
}
