import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Header from './Header';
import renderWithProvider from '../../../setupTests';

const initialState = {
  auth: { token: null, user: null },
  usersCatalog: {
    usersList: {},
  },
};

describe('Header', () => {
  it('renders Search without results', () => {
    renderWithProvider(<Header />, {
      initialState,
    });

    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('renders Header with Sign In and Sign Up button for not logged in users', () => {
    renderWithProvider(<Header />, {
      initialState,
    });

    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });

  it('renders Header with Sign Out and Dashboard button for logged in users', () => {
    renderWithProvider(<Header />, {
      initialState: {
        ...initialState,
        auth: { token: 12345, user: { id: 1 } },
      },
    });

    expect(screen.getByText('Sign Out')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('Clear store and localStorage after signOut button clicked', () => {
    localStorage.setItem('token', '1234567');
    localStorage.setItem('userId', '7654321');

    renderWithProvider(<Header />, {
      initialState: {
        ...initialState,
        auth: { token: 1234567, user: { id: 7654321 } },
      },
    });

    expect(localStorage.getItem('token')).toEqual('1234567');
    expect(localStorage.getItem('userId')).toEqual('7654321');

    userEvent.click(screen.getByText('Sign Out'));

    expect(localStorage.getItem('token')).toEqual(null);
    expect(localStorage.getItem('userId')).toEqual(null);
  });
});
