import { SIGN_IN, SIGN_OUT, SIGN_UP, AUTH_ERROR, CLEAR_AUTH_ERROR } from '../actions/actionType';

export default (state = {token: null, userId: null, error: ''}, action) => {
    switch (action.type) {
        case AUTH_ERROR:
            return {...state, error: action.payload}
        case CLEAR_AUTH_ERROR:
            return {...state, error: ''}
        case SIGN_IN:
            return {...state, userId: action.payload.userId, token: action.payload.token, error: '' }
        case SIGN_UP:
            return {...state, userId: action.payload.userId, token: action.payload.token, error: '' }
        case SIGN_OUT:
            return {...state, userId: null, token: null }
        default:
            return state;
    }
}