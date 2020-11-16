import { connect } from 'react-redux';
import SignUp from './signUp';
import { signUp } from '../../../actions';

const mapStateToProps = (state) => {
  return {
    auth: state.form.authUserForm,
    error: state.auth.error,
  };
};

export default connect(mapStateToProps, { signUp })(SignUp);
