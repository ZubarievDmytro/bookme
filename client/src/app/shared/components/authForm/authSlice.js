import { createSlice } from '@reduxjs/toolkit';
import users from '../../../../apis/users';
import { updatedUsersList } from '../../../features/catalog/catalogSlice';

const initialState = {
  token: null,
  error: null,
  user: null,
  bookings: null,
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signedIn: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.bookings = action.payload.bookings;
    },
    authError: (state, action) => {
      state.error = action.payload;
    },
    signedOut: (state) => {
      state.token = null;
      state.user = null;
      state.bookings = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    },
    loadedBookings: (state, action) => {
      state.bookings = action.payload;
    },
    addedBooking: (state, action) => {
      state.bookings.push(action.payload);
    },
    deletedBooking: (state, action) => {
      state.bookings = state.bookings.filter(
        (booking) => booking.id !== action.payload
      );
    },
    updatedUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {
  signedIn,
  authError,
  signedOut,
  loadedBookings,
  addedBooking,
  deletedBooking,
  updatedUser,
} = authSlice.actions;

export const deleteUser = (userId, token) => async (dispatch) => {
  const res = await users.delete(`/users/delete/${userId}`, {
    headers: {
      authorization: token,
    },
  });
  localStorage.removeItem('token');
  localStorage.removeItem('userId');

  dispatch(signedOut());
  dispatch(
    updatedUsersList({
      type: 'delete',
      data: res.data,
    })
  );

  return {
    redirectTo: `/`,
  };
};

export const updateUser = (formValues, userId, token) => async (dispatch) => {
  const res = await users.patch(`/users/${userId}`, formValues, {
    headers: {
      authorization: token,
    },
  });

  dispatch(updatedUser(res.data));
  dispatch(
    updatedUsersList({
      type: 'update',
      data: res.data,
    })
  );

  return {
    redirectTo: '/dashboard',
  };
};

export const saveBooking = (userId, bookingInfo) => async (dispatch) => {
  const res = await users.post(`/bookings/${userId}`, bookingInfo);

  dispatch(addedBooking(res.data[1]));
};

export const deleteBooking = (booking, token) => async (dispatch) => {
  const res = await users.patch(`/bookings/${booking.user.id}`, booking, {
    headers: {
      authorization: token,
    },
  });

  dispatch(deletedBooking(res.data[1]));
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

  dispatch(
    signedIn({
      user: { ...res.data },
      token,
      bookings: resBookings.data,
    })
  );
};

export const authUser = (formProps, type) => async (dispatch) => {
  const res =
    type === 'signin'
      ? await users.post('/signin', formProps)
      : await users.post('/signup', formProps);

  if (res.data.error) {
    dispatch(authError(res.data.error));
    return false;
  }
  const bookings = await users.get(`/bookings/`, {
    headers: {
      email: formProps.email,
    },
  });
  dispatch(signedIn(res.data));
  dispatch(loadedBookings(bookings.data));
  localStorage.setItem('token', res.data.token);
  localStorage.setItem('userId', res.data.user.id);

  return type === 'signin'
    ? {
        redirectTo: `/dashboard/`,
      }
    : {
        redirectTo: `/dashboard/edit/${res.data.user.id}`,
      };
};

export default authSlice.reducer;
