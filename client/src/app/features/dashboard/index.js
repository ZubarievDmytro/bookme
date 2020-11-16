import { connect } from 'react-redux';
import Dashboard from './dashboard';
import { fetchSignedInUser, fetchBookingsByEmail } from '../../../actions';

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.users.signedInUser,
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps, {
  fetchSignedInUser,
  fetchBookingsByEmail,
})(Dashboard);
