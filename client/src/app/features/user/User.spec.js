import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as reactRedux from 'react-redux';
import User from './User';
import renderWithProvider from '../../../setupTests';

const initialState = {
  usersCatalog: {
    usersList: {},
  },
  userPage: {
    fetchedUser: {},
  },
  auth: {
    user: {},
  },
};

const testUser = {
  id: 12345,
  name: 'Test user',
  description: 'Test description',
};

describe('User', () => {
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
  afterEach(cleanup);

  it('should load user if there is no user preloaded', () => {
    const dummyDispatch = jest.fn();
    useDispatchMock.mockReturnValue(dummyDispatch);

    renderWithProvider(<User match={{ params: { id: '12345' } }} />, {
      initialState,
    });

    expect(dummyDispatch).toHaveBeenCalled();
  });

  it('should display user if user exist in store', () => {
    const dummyDispatch = jest.fn();
    useDispatchMock.mockReturnValue(dummyDispatch);

    renderWithProvider(<User match={{ params: { id: 12345 } }} />, {
      initialState: {
        ...initialState,
        usersCatalog: {
          usersList: {
            12345: testUser,
          },
        },
      },
    });

    expect(document.querySelectorAll('.card img').length).toEqual(1);
    expect(screen.getByText('Test user')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });
});
