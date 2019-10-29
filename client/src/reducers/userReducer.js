import { FETCH_USERS } from '../actions/actionType';
import _ from 'lodash';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_USERS: 
            return {...state, ..._.mapKeys(action.payload, 'id') }
        default:
            return state;
    }
}