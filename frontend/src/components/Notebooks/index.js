import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, useHistory } from 'react-router-dom';

import * as notebooksActions from '../../store/notebooks'

export default function Notebooks() {
    const dispatch = useDispatch()
    const history = useHistory()

    const sessionUser = useSelector(state => state.session.user);
    const userId = sessionUser.id
    const notebooks = useSelector(state => state.notebooks.notebooks);
    const nbData = Object.values(notebooks)
    console.log(nbData)

    const [notebookList, setNotebooklist] = useState([])

    useEffect(() => {
        dispatch(notebooksActions.getNotebooksThunk(userId))
    }, [dispatch])

    return (
        <>
            <h2>Notebooks</h2>
            {console.log(notebookList)}
        </>
    )
}
