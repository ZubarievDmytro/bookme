import { connect } from 'react-redux';
import UsersList from './UsersList';
import { fetchUsers } from '../../../../../actions';

const mapStateToProps = (state) => {
  return {
    users: Object.values(state.users.usersList),
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps, { fetchUsers })(UsersList);
