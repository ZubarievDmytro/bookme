import { configureStore } from '@reduxjs/toolkit';
import { reducer as formReducer } from 'redux-form';
import catalogReducer from './features/catalog/catalogSlice';
import userReducer from './features/user/userSlice';
import authReducer from './shared/components/authForm/authSlice';

export default configureStore({
  reducer: {
    usersCatalog: catalogReducer,
    userPage: userReducer,
    form: formReducer,
    auth: authReducer,
  },
});
