import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import users from '../../../apis/users';

export const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    fetchedUser: (state, action) => {
      state.fetchedUser = action.payload;
    },
  },
});

export const { fetchedUser, savedBooking } = userSlice.actions;

export const selectUser = (state) => state.userPage.fetchedUser;

export const fetchUserById = (userId) => async (dispatch) => {
  const res = await users.get(`/users/${userId}`);
  dispatch(fetchedUser(res.data));
};

export default userSlice.reducer;
