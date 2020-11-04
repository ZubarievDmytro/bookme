import React from 'react';
import { Loader, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { signIn, signOut, fetchUsers } from './actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    // this.props.fetchUsers();

    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '933713769986-sc19lpemkpj7p3kmq4l4d1knekrr1q7i.apps.googleusercontent.com',
          scope: 'profile email',
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    const {
      createUser: createUserProp,
      signIn: signInProp,
      signOut: signOutProp,
    } = this.props;
    if (isSignedIn) {
      const { users } = this.props;
      const userInfo = this.auth.currentUser.get();
      const id = userInfo.getId();
      const user = users.filter((userItem) => userItem.userId === id);
      const basicProfile = userInfo.getBasicProfile();
      if (!user[0]) {
        const name = basicProfile.getName();
        const userData = {
          id,
          name,
          userId: id,
          title: name,
          avatarUrl: basicProfile.getImageUrl(),
          email: basicProfile.getEmail(),
        };
        createUserProp(userData);
      }
      signInProp(id);
    } else {
      signOutProp();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    const { isSignedIn, size, text } = this.props;
    if (isSignedIn === 'loading') {
      return <Loader active inline size="small" />;
    }
    if (isSignedIn) {
      return (
        <Button color="red" onClick={this.onSignOutClick}>
          Sign Out
        </Button>
      );
    }
    return (
      <Button onClick={this.onSignInClick} size={size}>
        {text}
      </Button>
    );
  }

  render() {
    return this.renderAuthButton();
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    users: Object.values(state.users),
  };
};

export default connect(mapStateToProps, {
  signIn,
  signOut,
  fetchUsers,
})(GoogleAuth);
