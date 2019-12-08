import { SIGN_IN, SIGN_OUT, FETCH_USERS, UPDATE_BOOKINGS, FETCH_USER, UPDATE_USER } from './actionType';
import users from '../apis/users';
import history from '../history';

export const SignIn = user => {
    return {
        type: SIGN_IN,
        payload: user
    }
}

export const SignOut = () => {
    return {
        type: SIGN_OUT 
    }
}

export const fetchUsers = () => async dispatch => {
    const res = await users.get('/users');

    dispatch({type: FETCH_USERS, payload: res.data});
}

export const fetchUser = userId => async dispatch => {
    const res = await users.get(`/users?userId=${userId}`);
    dispatch({type: FETCH_USER, payload: res.data[0]});
}

export const updateBookings = (userUpdated, currentUserUpdated) => async dispatch => {
    await users.patch(`/users/${userUpdated.id}`, userUpdated);
    await users.patch(`/users/${currentUserUpdated.id}`, currentUserUpdated);

    dispatch({type: UPDATE_BOOKINGS, payload: [userUpdated, currentUserUpdated]});
}

export const updateUser = (formValues, id) => async dispatch => {
    const res = await users.patch(`/users/${id}`, formValues);
    history.push('/dashboard');
    dispatch({type: UPDATE_USER, payload: res.data});
}