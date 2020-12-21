import { connect } from 'react-redux';
import GoogleAuth from './GoogleAuth';
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
