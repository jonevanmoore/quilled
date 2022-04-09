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
export const createNewNote = (newNote) => {
    return {
        type: CREATE_NOTE,
        newNote
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

//DELETE NOTE
export const destroyNote = (noteData) => async (dispatch) => {
    const { userId, id } = noteData;

    const res = await csrfFetch(`/api/users/${userId}/notes/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ id })
    });

    const removeNote = await res.json()
    dispatch(deleteNote(removeNote.note))
    return removeNote
}

//EDIT NOTE
export const editNote = (noteData) => async (dispatch) => {
    const { userId, id, title, content, notebookId } = noteData
    const res = await csrfFetch(`/api/users/${userId}/notes/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content, notebookId })
    });

    const patchNote = await res.json()
    dispatch(updateNote(patchNote.note))
    return patchNote
}



const initialState = { notes: {} }

const notesReducer = (state = initialState, action) => {
    let newState;
    let newNotes;

    switch (action.type) {
        case GET_NOTES:
            newState = { ...state }
            newNotes = action.notes.reduce((all, note) => {
                all[note.id] = note
                return all;
            }, {})
            newState.notes = newNotes
            return newState;
        case CREATE_NOTE:
            newState = { ...state };
            newNotes = { ...state.notes }
            newNotes[action.newNote.id] = action.newNote;
            newState.notes = newNotes;
            return newState;
        case DELETE_NOTE:
            newState = { ...state };
            newNotes = { ...state.notes };
            delete newNotes[action.note.id];
            newState.notes = newNotes;
            return newState;
        case UPDATE_NOTE:
            newState = { ...state };
            newNotes = { ...state.notes }
            newNotes[action.note.id] = action.note;
            newState.notes = newNotes;
            return newState;
        default:
            return state
    }
}

export default notesReducer
