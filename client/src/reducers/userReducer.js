import { FETCH_USERS, UPDATE_BOOKINGS, UPDATE_USER } from '../actions/actionType';
import _ from 'lodash';

export default (state = [], action) => {
    
    switch (action.type) {
        case FETCH_USERS:
            return {..._.mapKeys(action.payload, 'userId')};
        case UPDATE_BOOKINGS:
            const [userUpdated, currentUserUpdated] = action.payload;
            return {...state, [userUpdated.id]: userUpdated, [currentUserUpdated.id]: currentUserUpdated};
        case UPDATE_USER:
            
            return {...state, [action.payload.userId]: action.payload};
        default:
            return state;
    }
}