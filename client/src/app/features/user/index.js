import { connect } from 'react-redux';
import User from './User';
import { fetchUserById, saveBooking } from '../../../actions';

const mapStateToProps = (state, ownProps) => {
  return {
    fetchedUser: state.users.fetchedUser,
    signedInUser: state.users.signedInUser,
    user: state.users.usersList[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchUserById, saveBooking })(User);
