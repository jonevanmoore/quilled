import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useHistory, useParams } from 'react-router-dom';
import * as notebooksActions from '../../store/notebooks'

export default function IndieNotebook() {
    const dispatch = useDispatch()

    const { notebookId } = useParams()
    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id
    const notebook = useSelector(state => state.notebooks.notebooks[notebookId]);
    console.log(notebook)


    useEffect(() => {
        dispatch(notebooksActions.fetchNotebooks(userId))
    }, [dispatch])

    return (
        <>
            <title>{`Notebook - ${notebook.title}`}</title>
            <h2>IndieNOtebook</h2>
            <h2>{notebook}</h2>
        </>
    )
}
