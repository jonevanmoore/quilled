import { csrfFetch } from './csrf';

const GET_USERS = 'session/getUsers'

const getUsers = (users) => {
    return {
        type: GET_USERS,
        users
    }
}

//GET USERS
export const fetchUsers = (users) => async (dispatch) => {
    const res = await csrfFetch('/api/users/')
    const userList = await res.json();
    dispatch(getUsers(userList.users))
    return userList
}

const insitalState = { users: {} }

const usersReducer = (state = insitalState, action) => {

    let newState;
    let newUsers;

    switch (action.type) {
        case GET_USERS:
            newState = { ...state }
            newUsers = action.users.reduce((all, user) => {
                all[user.id] = user
                return all;
            }, {})
            newState.users = newUsers
            return newState;
        default:
            return state
    }
}

export default usersReducer
