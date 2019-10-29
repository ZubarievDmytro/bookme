import { SIGN_IN, SIGN_OUT, FETCH_USERS } from './actionType';
import users from '../apis/users';

export const SignIn = id => {
    return {
        type: SIGN_IN,
        payload: id
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