import { FETCH_USERS } from '../actions/actionType';
import _ from 'lodash';

export default (state = {usersList: {}}, action) => {
    switch (action.type) {
        case FETCH_USERS:
            return {...state, usersList: {..._.mapKeys(action.payload, 'id')} };
        default:
            return state;
    }
}