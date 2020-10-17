import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { fetchSignedInUser } from './actions'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    {"auth": {
        "token": localStorage.getItem('token'),
        "userId": localStorage.getItem('userId')
    }},
    composeEnhancers(applyMiddleware(thunk))
);

if (localStorage.getItem('token') && localStorage.getItem('userId')) {
    store.dispatch(fetchSignedInUser(localStorage.getItem('userId'), localStorage.getItem('token')));
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);
