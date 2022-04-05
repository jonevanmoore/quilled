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

    useEffect(() => {
        dispatch(notebooksActions.fetchNotebooks(userId))
    }, [dispatch])

    const deleteNotebook = async () => {
        history.push('/notebooks')
        await dispatch(notebooksActions.destroyNotebook({
            userId: notebook.userId,
            id: notebook.id
        }))
    }

    return (
        <>
            <h2>IndieNOtebook</h2>
            <h2>{notebook.title}</h2>
            <button onClick={deleteNotebook}>DELETE NOTEBOOK</button>
        </>
    )
}
