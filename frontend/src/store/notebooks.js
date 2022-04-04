import { csrfFetch } from './csrf';

const GET_NOTEBOOKS = '/users/GET_NOTEBOOKS'

export const getNotebooks = (notebooks) => {
    return {
        type: GET_NOTEBOOKS,
        notebooks,
    };
}


//THUNKS

//GET NOTEBOOKS
export const fetchNotebooks = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/notebooks`)
    const notebooks = await res.json();
    dispatch(getNotebooks(notebooks.notebooks));
    return notebooks;
};



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
        default:
            return state
    }
}

export default notebooksReducer
