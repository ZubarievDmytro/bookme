import { connect } from 'react-redux';
import DashboardEdit from './DashboardEdit';
import { updateUser, fetchSignedInUser, deleteUser } from '../../../actions';

const mapStateToProps = (state) => {
  return {
    user: state.users.signedInUser,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps, {
  updateUser,
  fetchSignedInUser,
  deleteUser,
})(DashboardEdit);
