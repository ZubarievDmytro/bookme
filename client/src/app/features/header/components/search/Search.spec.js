import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import * as reactRedux from 'react-redux';
import renderWithProvider from '../../../../../setupTests';
import Search from './Search';

const initialState = {
  usersCatalog: {
    usersList: {},
  },
};

const initialStateWithUsersList = {
  usersCatalog: {
    usersList: {
      1: { id: 1, name: 'Test Name', description: 'Test description' },
      2: {
        id: 2,
        name: 'Test Name 2',
        description: 'Description 2',
      },
      3: {
        id: 3,
        name: 'John Connely',
        description: 'Description 3',
      },
    },
  },
};

describe('Search without preloaded users', () => {
  const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
  const dummyDispatch = jest.fn();

  beforeEach(() => {
    useDispatchMock.mockReturnValue(dummyDispatch);
    renderWithProvider(<Search />, {
      initialState,
    });
  });

  afterEach(() => {
    useDispatchMock.mockClear();
    cleanup();
  });

  it('renders Search without results', async () => {
    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('should loads users on focus', () => {
    userEvent.click(screen.getByRole('textbox'));
    expect(dummyDispatch).toHaveBeenCalled();
  });
});

describe('Search with preloaded users', () => {
  afterEach(cleanup);
  beforeEach(() => {
    renderWithProvider(<Search />, {
      initialState: initialStateWithUsersList,
    });
  });

  it('remove results if user clear the search field', () => {
    userEvent.type(screen.getByRole('textbox'), 'Joh');

    expect(screen.getByRole('textbox')).toHaveValue('Joh');

    userEvent.clear(screen.getByRole('textbox'), 'Joh');
    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('clear results after user click on search result', async () => {
    userEvent.type(screen.getByRole('textbox'), 'Joh');

    expect(screen.getByRole('textbox')).toHaveValue('Joh');

    userEvent.click(document.querySelector('.result'));
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('show no result if user search for non existing user', async () => {
    userEvent.type(screen.getByRole('textbox'), 'John');

    expect(screen.getByRole('textbox')).toHaveValue('John');

    userEvent.type(screen.getByRole('textbox'), ' Smith');
    expect(screen.getByRole('textbox')).toHaveValue('John Smith');

    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('shows a few results after user type in input', async () => {
    userEvent.type(screen.getByRole('textbox'), 'Test');

    expect(document.querySelectorAll('.result').length).toEqual(2);
  });

  it('shows one result after user type in input specific text', async () => {
    userEvent.type(screen.getByRole('textbox'), 'Joh');

    expect(document.querySelectorAll('.result').length).toEqual(1);
  });
});
