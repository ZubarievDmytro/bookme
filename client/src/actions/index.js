import { SIGN_IN, SIGN_OUT, FETCH_USERS } from './actionType';
import users from '../apis/users';

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

export const fetchUser = userId => {
    const res = users.get(`/users?userId=${userId}`).then(res => res.data[0]);
    return res;
}