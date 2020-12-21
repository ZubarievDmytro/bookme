import { connect } from 'react-redux';
import SignIn from './SignIn';
import { signIn } from '../../../actions';

const mapStateToProps = (state) => {
  return {
    auth: state.form.authUserForm,
    error: state.auth.error,
  };
};

export default connect(mapStateToProps, { signIn })(SignIn);
