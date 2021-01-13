import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux';
import App from './App';
import { fetchSignedInUser } from './app/shared/components/authForm/authSlice';
import store from './app/store';

if (localStorage.getItem('token') && localStorage.getItem('userId')) {
  store.dispatch(
    fetchSignedInUser(
      localStorage.getItem('userId'),
      localStorage.getItem('token')
    )
  );
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
