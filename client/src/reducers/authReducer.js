import { SIGN_IN, SIGN_OUT } from '../actions/actionType';

export default (state = {isSignedIn: '', userId: null}, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {...state, isSignedIn: true, userId: action.payload }
        case SIGN_OUT:
            return {...state, isSignedIn: false, user: null }
        default:
            return state;
    }
}