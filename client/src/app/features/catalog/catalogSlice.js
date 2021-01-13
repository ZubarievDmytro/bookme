import { createSlice } from '@reduxjs/toolkit';
import users from '../../../apis/users';

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState: {
    usersList: {},
  },
  reducers: {
    fetchedUsers: (state, action) => {
      state.usersList = action.payload;
    },
    updatedUsersList: (state, action) => {
      if (action.payload.type === 'update') {
        if (Object.values(state.usersList).length) {
          state.usersList = {
            ...state.usersList,
            [action.payload.data.id]: action.payload.data,
          };
        }
      } else {
        delete state.usersList[action.payload.data.id];
      }
    },
  },
});

export const { fetchedUsers, updatedUsersList } = catalogSlice.actions;

export const selectUsers = (state) => state.usersCatalog.usersList;

export const fetchUsers = () => async (dispatch) => {
  const res = await users.get('/users');

  dispatch(fetchedUsers(res.data));
};

export default catalogSlice.reducer;
