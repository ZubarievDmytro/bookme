import { 
    FETCH_USERS, 
    CLEAR_SIGNED_IN_USER, 
    FETCH_USER_BY_ID, 
    FETCH_SIGNED_IN_USER, 
    UPDATE_USER, 
    SAVE_BOOKING, 
    FETCH_BOOKINGS,
    DELETE_BOOKING,
    DELETE_USER
} from '../actions/actionType';
import _ from 'lodash';

export default (state = {usersList: {}, fetchedUser: {}, signedInUser: {}, fetchedBookings: []}, action) => {
    switch (action.type) {
        case FETCH_USERS:
            return {...state, usersList: {...action.payload}};
        case FETCH_USER_BY_ID:
            return {...state, fetchedUser: {...action.payload}};
        case FETCH_SIGNED_IN_USER:
            return {...state, signedInUser: {...action.payload}};
        case CLEAR_SIGNED_IN_USER:
            return {...state, signedInUser: null}
        case SAVE_BOOKING:
            if (_.isEmpty(state.usersList)) {
                return state;
            } else {
                return {...state, 
                        usersList: {...state.usersList, [action.payload[0]._id]: {...action.payload[0]}},
                        fetchedBookings: [...state.fetchedBookings, action.payload[1]]
                    };
            }
        case DELETE_BOOKING:
            if (_.isEmpty(state.usersList)) {
                return {
                    ...state,
                    fetchedBookings: [...state.fetchedBookings.filter(bookings => bookings._id !== action.payload[1])]
                };
            } else {
                return {...state, 
                        usersList: {...state.usersList, [action.payload[0]._id]: {...action.payload[0]}},
                        fetchedBookings: [...state.fetchedBookings.filter(bookings => bookings._id !== action.payload[1])]
                    };
            }
        case FETCH_BOOKINGS:
            return {...state, fetchedBookings: action.payload};
        case UPDATE_USER:
            if (_.isEmpty(state.usersList)) {
                return {...state, signedInUser: {...action.payload}};
            } else {
                return {
                    ...state, 
                    usersList: {...state.usersList, [action.payload._id]: {...action.payload}},
                    signedInUser: {...action.payload}
                };
            }
        case DELETE_USER:
            if (_.isEmpty(state.usersList)) {
                return {...state, signedInUser: null};
            } else {
                return {
                    ...state, 
                    usersList: {...Object.values(state.usersList).filter(user => user._id !== action.payload._id)},
                    signedInUser: null
                };
            }
        default:
            return state;
    }
}