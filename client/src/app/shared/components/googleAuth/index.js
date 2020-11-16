import { connect } from 'react-redux';
import GoogleAuth from './googleAuth';
import { signIn, signOut, fetchUsers } from '../../../../actions';

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
