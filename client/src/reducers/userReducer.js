import { FETCH_USERS, UPDATE_USERS } from '../actions/actionType';
import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_USERS:
            return {..._.mapKeys(action.payload, 'id')};
        case UPDATE_USERS:
            const [userUpdated, currentUserUpdated] = action.payload;
            return {...state, [userUpdated.id]: userUpdated, [currentUserUpdated.id]: currentUserUpdated};
        default:
            return state;
    }
}