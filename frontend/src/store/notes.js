import { csrfFetch } from './csrf';

const GET_NOTES = '/users/GET_NOTES';

export const getNotes = (notes) => {
    return {
        type: GET_NOTES,
        notes
    }
}


//THUNKS

//GET NOTES
export const fetchNotes = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/notes`)
    const notes = await res.json();
    dispatch(getNotes(notes.notes));
    return notes;
};


const initialState = { notes: {} }

const notesReducer = (state = initialState, action) => {
    let newState;
    let newNotes;

    switch (action.type) {
        case GET_NOTES:
            newState = { ...state }
            newNotes = action.notes.reduce((acc, note) => {
                acc[note.id] = note
                return acc;
            }, {})
            newState.notes = newNotes
            return newState;
        default:
            return state
    }
}

export default notesReducer
