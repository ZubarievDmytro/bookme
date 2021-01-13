import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import renderWithProvider from './setupTests';

const initialState = {
  usersCatalog: {
    usersList: {
      1: {
        id: 1,
        name: 'Test user',
        description: 'Test description',
      },
    },
  },
  userPage: {
    fetchedUser: {},
  },
  auth: {
    user: null,
  },
};

describe('User', () => {
  it('should render Home component by default with list of users', async () => {
    renderWithProvider(<App />, { initialState });

    expect(document.querySelectorAll('img').length).toEqual(1);
    expect(screen.getByText('Test user')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });
});
