import { csrfFetch } from './csrf';

const GET_NOTEBOOKS = '/users/GET_NOTEBOOKS'
const CREATE_NOTEBOOK = '/users/CREATE_NOTEBOOK'
const DELETE_NOTEBOOK = '/users/DELETE_NOTEBOOK'

//MANY
export const getNotebooks = (notebooks) => {
    return {
        type: GET_NOTEBOOKS,
        notebooks,
    };
}

export const createNewNotebook = (newNotebook) => {
    return {
        type: CREATE_NOTEBOOK,
        newNotebook
    }
}

export const deleteNotebook = (notebook) => {
    return {
        type: DELETE_NOTEBOOK,
        notebook
    }
}


//THUNKS

//GET NOTEBOOKS
export const fetchNotebooks = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/notebooks`)
    const notebooks = await res.json();
    dispatch(getNotebooks(notebooks.notebooks));
    return notebooks;
};

//CREATE NOTEBOOK
export const createNotebook = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/notebooks`, {
        method: 'POST',
        body: JSON.stringify({ userId })
    });

    const newNotebook = await res.json()
    dispatch(createNewNotebook(newNotebook.newNotebook))
    return newNotebook.newNotebook.id
}

//DELETE NOTEBOOK
export const destroyNotebook = (notebook) => async (dispatch) => {
    const { userId, id } = notebook;

    const res = await csrfFetch(`/api/users/${userId}/notebooks/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ id })
    });

    const removeNotebook = await res.json()
    dispatch(deleteNotebook(removeNotebook.notebook))
    return removeNotebook
}



const initialState = { notebooks: {} }

const notebooksReducer = (state = initialState, action) => {
    let newState;
    let newNotebooks;

    switch (action.type) {
        case GET_NOTEBOOKS:
            newState = { ...state }
            newNotebooks = action.notebooks.reduce((acc, notebook) => {
                acc[notebook.id] = notebook
                return acc;
            }, {})
            newState.notebooks = newNotebooks
            return newState;
        case CREATE_NOTEBOOK:
            newState = { ...state };
            newNotebooks = { ...state.notebooks };
            newNotebooks[action.newNotebook.id] = action.newNotebook;
            newState.notebooks = newNotebooks;
            return newState;
        case DELETE_NOTEBOOK:
            newState = { ...state };
            newNotebooks = { ...state.notebooks };
            delete newNotebooks[action.notebook.id];
            newState.notebooks = newNotebooks;
            return newState;
        default:
            return state
    }
}

export default notebooksReducer
