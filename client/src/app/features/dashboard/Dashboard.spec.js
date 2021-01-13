import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from './Dashboard';
import renderWithProvider from '../../../setupTests';

const initialState = {
  usersCatalog: {
    usersList: {},
  },
  userPage: {
    fetchedUser: {},
  },
  auth: {
    user: {
      id: 12345,
      name: 'Test user',
      description: 'Test description',
      bookings: [],
    },
    bookings: [],
  },
};

describe('Dashboard', () => {
  it('should render Dashboard', async () => {
    renderWithProvider(<Dashboard />, { initialState });

    expect(document.querySelectorAll('img').length).toEqual(1);
    expect(screen.getByText('Test user')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });
  it('should not render Dashboard without user', async () => {
    renderWithProvider(<Dashboard />, {
      initialState: {
        ...initialState,
        auth: {
          user: null,
        },
      },
    });

    expect(document.querySelectorAll('.active.loader').length).toEqual(1);
  });
});
