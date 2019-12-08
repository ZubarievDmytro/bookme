import { FETCH_USERS, FETCH_USER, UPDATE_BOOKINGS, UPDATE_USER } from '../actions/actionType';
import _ from 'lodash';

export default (state = {usersList: [], fetchedUser: {}}, action) => {
    switch (action.type) {
        case FETCH_USERS:
            return {...state, usersList: {..._.mapKeys(action.payload, 'id')}};
        case FETCH_USER:
            return {...state, fetchedUser: {...action.payload}};
        case UPDATE_BOOKINGS:
            const [userUpdated, currentUserUpdated] = action.payload;
            return {...state, usersList:{...state.usersList, [userUpdated.id]: userUpdated, [currentUserUpdated.id]: currentUserUpdated}};
        case UPDATE_USER:
            return {...state, usersList:{...state.usersList, [action.payload.id]: action.payload}, fetchedUser: {...action.payload}};
        default:
            return state;
    }
}