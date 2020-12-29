import React from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Search from './components/search';
import { signedOut } from '../../shared/components/authForm/authSlice';

const Header = ({ users, fetchUsers }) => {
  const dispatch = useDispatch();
  const { token: isSignedIn, user } = useSelector((state) => state.auth);
  const onSignOutClick = () => {
    dispatch(signedOut());
  };

  const renderAuthButtons = () => {
    if (!isSignedIn) {
      return (
        <>
          <Button as={Link} to="/signin" name="Sign in" content="Sign in" />
          <Button.Or />
          <Button as={Link} to="/signup" name="Sign up" content="Sign up" />
        </>
      );
    }
    return (
      <>
        <Button
          color="red"
          name="Sign Out"
          onClick={() => onSignOutClick()}
          content="Sign Out"
        />
      </>
    );
  };

  return (
    <Menu>
      <Menu.Item as={Link} to="/" name="home" />
      {user && user.id && (
        <Menu.Item as={Link} to="/dashboard" name="dashboard" />
      )}
      <Menu.Menu position="right">
        <Menu.Item>
          <Search users={users} fetchUsers={fetchUsers} />
        </Menu.Item>
        <Menu.Item>
          <Button.Group>{renderAuthButtons()}</Button.Group>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
