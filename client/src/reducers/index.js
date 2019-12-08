import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import { reducer } from 'redux-form';

export default combineReducers({
    auth: authReducer,
    users: userReducer,
    form: reducer
});
