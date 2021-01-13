import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import reducer from './app/shared/components/authForm/authSlice';

configure({ adapter: new Adapter() });

const renderWithProvider = (
  ui,
  {
    initialState,
    store = createStore(reducer, initialState, applyMiddleware(thunk)),
    ...renderOptions
  } = {}
) => {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <Router>{children} </Router>
      </Provider>
    );
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export default renderWithProvider;
