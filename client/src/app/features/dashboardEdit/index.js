import DashboardEdit from './dashboardEdit';
import { updateUser, fetchSignedInUser, deleteUser } from '../../../actions';
import { connect } from 'react-redux';

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