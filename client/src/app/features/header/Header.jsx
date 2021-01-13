import React from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useGoogleLogout } from 'react-google-login';
import Search from './components/search';
import { signedOut } from '../../shared/components/authForm/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const clientId =
    '933713769986-sc19lpemkpj7p3kmq4l4d1knekrr1q7i.apps.googleusercontent.com';

  const { signOut } = useGoogleLogout({ clientId });
  const { token: isSignedIn, user } = useSelector((state) => state.auth);
  const onSignOutClick = () => {
    dispatch(signedOut());
    signOut();
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
          <Search />
        </Menu.Item>
        <Menu.Item>
          <Button.Group>{renderAuthButtons()}</Button.Group>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
