import {
  SIGN_IN,
  SIGN_UP,
  SIGN_OUT,
  AUTH_ERROR,
  CLEAR_AUTH_ERROR,
  FETCH_USERS,
  FETCH_USER_BY_ID,
  FETCH_SIGNED_IN_USER,
  CLEAR_SIGNED_IN_USER,
  UPDATE_USER,
  DELETE_USER,
  SAVE_BOOKING,
  FETCH_BOOKINGS,
  DELETE_BOOKING,
} from './actionType';
import users from '../apis/users';

export const signUp = (formProps) => async (dispatch) => {
  const res = await users.post('/signup', formProps);
  if (res.data.error) {
    dispatch({
      type: AUTH_ERROR,
      payload: res.data.error,
    });
    return false;
  }
  dispatch({
    type: SIGN_UP,
    payload: res.data,
  });

  localStorage.setItem('token', res.data.token);
  localStorage.setItem('userId', res.data.userId);

  return {
    redirectTo: `/dashboard/edit/${res.data.userId}`,
  };
};

export const signIn = (formProps) => async (dispatch) => {
  const res = await users.post('/signin', formProps);
  if (res.data.error) {
    dispatch({
      type: AUTH_ERROR,
      payload: res.data.error,
    });
    return false;
  }
  dispatch({
    type: SIGN_IN,
    payload: res.data,
  });
  localStorage.setItem('token', res.data.token);
  localStorage.setItem('userId', res.data.userId);
  return {
    redirectTo: `/dashboard/`,
  };
};

export const clearAuthError = () => (dispatch) => {
  dispatch({
    type: CLEAR_AUTH_ERROR,
  });
};

export const signOut = () => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');

  dispatch({ type: SIGN_OUT });
};

export const deleteUser = (userId, token) => async (dispatch) => {
  const res = await users.delete(`/users/delete/${userId}`, {
    headers: {
      authorization: token,
    },
  });
  localStorage.removeItem('token');
  localStorage.removeItem('userId');

  dispatch({ type: SIGN_OUT });
  dispatch({ type: DELETE_USER, payload: res.data });

  return {
    redirectTo: `/`,
  };
};

export const fetchUsers = () => async (dispatch) => {
  const res = await users.get('/users');

  dispatch({ type: FETCH_USERS, payload: res.data });
};

export const fetchUserById = (userId) => async (dispatch) => {
  const res = await users.get(`/users/${userId}`);
  dispatch({ type: FETCH_USER_BY_ID, payload: res.data });
};

export const fetchSignedInUser = (userId, token) => async (dispatch) => {
  const res = await users.get(`/users/dashboard/${userId}`, {
    headers: {
      authorization: token,
    },
  });

  const resBookings = await users.get(`/bookings/`, {
    headers: {
      email: res.data.email,
    },
  });

  dispatch({ type: FETCH_BOOKINGS, payload: resBookings.data });
  dispatch({ type: FETCH_SIGNED_IN_USER, payload: res.data });
};

export const clearSignedInUser = () => (dispatch) => {
  dispatch({ type: CLEAR_SIGNED_IN_USER });
};

export const updateUser = (formValues, userId, token) => async (dispatch) => {
  const res = await users.patch(`/users/${userId}`, formValues, {
    headers: {
      authorization: token,
    },
  });

  dispatch({ type: UPDATE_USER, payload: res.data });

  return {
    redirectTo: '/dashboard',
  };
};

export const saveBooking = (userId, bookingInfo) => async (dispatch) => {
  const res = await users.post(`/bookings/${userId}`, bookingInfo);

  dispatch({ type: SAVE_BOOKING, payload: res.data });
};

export const fetchBookingsByEmail = (email) => async (dispatch) => {
  const res = await users.get('/bookings/', email);

  dispatch({ type: FETCH_BOOKINGS, payload: res.data });
};

export const deleteBooking = (booking, token) => async (dispatch) => {
  const res = await users.patch(`/bookings/${booking.user.id}`, booking, {
    headers: {
      authorization: token,
    },
  });

  dispatch({ type: DELETE_BOOKING, payload: res.data });
};
