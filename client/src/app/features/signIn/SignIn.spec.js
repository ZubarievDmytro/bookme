import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignIn from './SignIn';
import renderWithProvider from '../../../setupTests';

const initialState = {
  form: {
    authUserForm: {},
  },
  auth: {
    error: null,
  },
};

describe('Sign In', () => {
  it('should render Sign In', async () => {
    renderWithProvider(<SignIn />, { initialState });

    expect(document.getElementById('Email')).toBeInTheDocument();
    expect(document.getElementById('Password')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });
});
