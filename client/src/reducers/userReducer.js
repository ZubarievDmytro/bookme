import _ from 'lodash';
import {
  FETCH_USERS,
  CLEAR_SIGNED_IN_USER,
  FETCH_USER_BY_ID,
  FETCH_SIGNED_IN_USER,
  UPDATE_USER,
  SAVE_BOOKING,
  FETCH_BOOKINGS,
  DELETE_BOOKING,
  DELETE_USER,
} from '../actions/actionType';

export default (
  state = {
    usersList: {},
    fetchedUser: {},
    signedInUser: {},
    fetchedBookings: [],
  },
  action
) => {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, usersList: { ...action.payload } };
    case FETCH_USER_BY_ID:
      return { ...state, fetchedUser: { ...action.payload } };
    case FETCH_SIGNED_IN_USER:
      return { ...state, signedInUser: { ...action.payload } };
    case CLEAR_SIGNED_IN_USER:
      return { ...state, signedInUser: null };
    case SAVE_BOOKING:
      if (_.isEmpty(state.usersList)) {
        return {
          ...state,
          fetchedBookings: [...state.fetchedBookings, action.payload[1]],
        };
      }
      return {
        ...state,
        usersList: {
          ...state.usersList,
          [action.payload[0].id]: { ...action.payload[0] },
        },
        fetchedBookings: [...state.fetchedBookings, action.payload[1]],
      };

    case DELETE_BOOKING:
      if (_.isEmpty(state.usersList)) {
        return {
          ...state,
          fetchedBookings: [
            ...state.fetchedBookings.filter(
              (bookings) => bookings.id !== action.payload[1]
            ),
          ],
        };
      }
      return {
        ...state,
        usersList: {
          ...state.usersList,
          [action.payload[0].id]: { ...action.payload[0] },
        },
        fetchedBookings: [
          ...state.fetchedBookings.filter(
            (bookings) => bookings.id !== action.payload[1]
          ),
        ],
      };

    case FETCH_BOOKINGS:
      return { ...state, fetchedBookings: action.payload };
    case UPDATE_USER:
      if (_.isEmpty(state.usersList)) {
        return { ...state, signedInUser: { ...action.payload } };
      }
      return {
        ...state,
        usersList: {
          ...state.usersList,
          [action.payload.id]: { ...action.payload },
        },
        signedInUser: { ...action.payload },
      };

    case DELETE_USER:
      if (_.isEmpty(state.usersList)) {
        return { ...state, signedInUser: null };
      }
      return {
        ...state,
        usersList: {
          ...Object.values(state.usersList).filter(
            (user) => user.id !== action.payload.id
          ),
        },
        signedInUser: null,
      };

    default:
      return state;
  }
};
