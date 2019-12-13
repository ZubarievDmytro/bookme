import { SIGN_IN, SIGN_OUT, FETCH_USERS, UPDATE_BOOKINGS, UPDATE_USER } from './actionType';
import users from '../apis/users';
import history from '../history';

const initialUserData = {
    "avatarUrl": "https://react.semantic-ui.com/images/wireframe/image.png",
    "profession": "Job title",
    "description": "There is no description yet",
    "bookings": {
      "shedule": [],
      "myBookings": [],
      "usersBookings": []
    }
}

export const SignIn = userId => {
    return {
        type: SIGN_IN,
        payload: userId
    }
}

export const SignOut = () => {
    return {
        type: SIGN_OUT 
    }
}

export const createUser = userData => async dispatch => {
    const res = await users.post(`/users?userId=${userData.userId}`, {...initialUserData, ...userData});

    dispatch({type: UPDATE_USER, payload: res.data})
}

export const fetchUsers = () => async dispatch => {
    const res = await users.get('/users');

    dispatch({type: FETCH_USERS, payload: res.data});
}

export const fetchUser = userId => async () => {
    const res = await users.get(`/users?userId=${userId}`);
    return res.data[0];
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