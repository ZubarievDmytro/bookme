import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardEdit from './DashboardEdit';
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
      schedule: ['5', '23'],
      avatarUrl: '',
      visible: false,
    },
    token: '12345',
    bookings: [],
  },
};

describe('Dashboard Edit', () => {
  const originalWarn = console.warn.bind(console.warn);

  beforeAll(() => {
    console.warn = (msg) =>
      !msg.toString().includes('componentWillReceiveProps') &&
      !msg.toString().includes('componentWillMount') &&
      originalWarn(msg);
  });

  afterAll(() => {
    console.warn = originalWarn;
  });

  it('should render DashboardEdit', async () => {
    renderWithProvider(<DashboardEdit />, { initialState });

    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
  });
});
