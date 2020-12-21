import { connect } from 'react-redux';
import header from './Header';
import { signOut, fetchUsers, clearSignedInUser } from '../../../actions';

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
})(header);
