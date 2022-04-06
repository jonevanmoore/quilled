import { csrfFetch } from './csrf';

const GET_NOTES = '/users/GET_NOTES';
const CREATE_NOTE = '/users/CREATE_NOTE';
const DELETE_NOTE = '/users/DELETE_NOTE';
const UPDATE_NOTE = '/users/UPDATE_NOTE';

export const getNotes = (notes) => {
    return {
        type: GET_NOTES,
        notes
    }
}
export const createNewNote = (note) => {
    return {
        type: CREATE_NOTE,
        note
    }
}
export const deleteNote = (note) => {
    return {
        type: DELETE_NOTE,
        note
    }
}
export const updateNote = (note) => {
    return {
        type: UPDATE_NOTE,
        note
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

//CREATE NOTE
export const createNote = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/notes`, {
        method: 'POST',
        body: JSON.stringify({ userId })
    });

    const newNote = await res.json()
    dispatch(createNewNote(newNote.newNote))
    return newNote.newNote.id
}



const initialState = { notes: {} }

const notesReducer = (state = initialState, action) => {
    let newState;
    let newNotes;

    switch (action.type) {
        case GET_NOTES:
            newState = { ...state }
            newNotes = action.notes.reduce((account, note) => {
                account[note.id] = note
                return account;
            }, {})
            newState.notes = newNotes
            return newState;
        case CREATE_NOTE:
            newState = { ...state };
            newState[action.note.id] = action.note;
            return newState;
        default:
            return state
    }
}

export default notesReducer
