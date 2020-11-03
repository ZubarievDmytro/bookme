import React from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import UserSearch from '../user/UserSearch';
import { signOut, fetchUsers, clearSignedInUser } from '../../actions';

function MenuComponent({
  userId,
  users,
  isSignedIn,
  fetchUsers: fetchPropsUsers,
  ...props
}) {
  const onSignOutClick = () => {
    props.signOut();
    props.clearSignedInUser();
  };

  const renderButtons = () => {
    if (!isSignedIn) {
      return (
        <>
          <Button as={Link} to="/signin" name="Sign in">
            Sign in
          </Button>
          <Button.Or />
          <Button as={Link} to="/signup" name="Sign up">
            Sign up
          </Button>
        </>
      );
    }
    return (
      <>
        <Button color="red" name="Sign Out" onClick={() => onSignOutClick()}>
          Sign Out
        </Button>
      </>
    );
  };

  return (
    <Menu>
      <Menu.Item as={Link} to="/" name="home" />
      {userId && <Menu.Item as={Link} to="/dashboard" name="dashboard" />}
      <Menu.Menu position="right">
        <Menu.Item>
          <UserSearch users={users} fetchUsers={fetchPropsUsers} />
        </Menu.Item>
        <Menu.Item>
          <Button.Group>{renderButtons()}</Button.Group>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.token,
    userId: state.auth.userId,
    users: Object.values(state.users.usersList),
  };
};

export default connect(mapStateToProps, {
  signOut,
  fetchUsers,
  clearSignedInUser,
})(MenuComponent);
