import React from 'react';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as reactRedux from 'react-redux';
import renderWithProvider from '../../../../../setupTests';
import UsersList from './UsersList';

const initialState = {
  usersCatalog: {
    usersList: {},
  },
};

describe('UsersList', () => {
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

  beforeEach(() => {
    useDispatchMock.mockClear();
  });

  afterEach(cleanup);

  it('should render a list of users', () => {
    renderWithProvider(<UsersList />, {
      initialState: {
        ...initialState,
        usersCatalog: {
          usersList: {
            1: { id: 1, name: 'Test Name', description: 'Test description' },
            2: { id: 2, name: 'John Test', description: 'Test description 2' },
          },
        },
      },
    });
    expect(document.querySelectorAll('.card').length).toEqual(2);
  });

  it('should loads users if there is no users in store', () => {
    const dummyDispatch = jest.fn();

    useDispatchMock.mockReturnValue(dummyDispatch);

    renderWithProvider(<UsersList />, {
      initialState,
    });
    expect(dummyDispatch).toHaveBeenCalled();
  });
});
