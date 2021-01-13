import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Bookings from './Bookings';
import renderWithProvider from '../../../../../setupTests';

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

describe('Bookings component without loaded bookings', () => {
  it('should render 2 sections for bookings', async () => {
    renderWithProvider(<Bookings />, { initialState });

    expect(screen.getByText('My Bookings')).toBeInTheDocument();
    expect(screen.getByText('Users booked me')).toBeInTheDocument();
  });
  it('should render No bookings yet if there is no bookings', async () => {
    renderWithProvider(<Bookings />, { initialState });

    expect(screen.getAllByText('No bookings yet').length).toEqual(2);
  });
});

describe('Bookings component with loaded bookings', () => {
  const initialStateWithBookings = {
    auth: {
      user: {
        id: 1,
        bookings: [
          {
            user: {
              id: 2,
              name: 'Test User 1',
            },
            date: '01-01-2021',
            email: 'test2@gmail.com',
            id: '1',
            name: 'Test User 2',
            time: '6',
          },
        ],
      },
      bookings: [
        {
          date: '02-01-2021',
          email: 'test1@gmail.com',
          id: '2',
          name: 'Test User 1',
          time: '6',
          user: {
            name: 'Test user 2',
          },
        },
      ],
    },
  };
  it('should render 2 sections for bookings', async () => {
    renderWithProvider(<Bookings />, {
      initialState: initialStateWithBookings,
    });

    expect(document.querySelectorAll('.fetchedBookings .card').length).toEqual(
      1
    );
    expect(document.querySelectorAll('.bookings .card').length).toEqual(1);
  });

  it('should open modal on click "x" icon and close on click No', () => {
    renderWithProvider(<Bookings />, {
      initialState: initialStateWithBookings,
    });
    userEvent.click(screen.getByTestId('delete_booking'));
    expect(
      screen.getByText('Are you sure you want to delete your booking?')
    ).toBeInTheDocument();

    expect(document.querySelectorAll('.modals.visible.active').length).toEqual(
      1
    );

    userEvent.click(screen.getByText('No'));

    expect(document.querySelectorAll('.modals').length).toEqual(0);
  });
});
