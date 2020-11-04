import React from 'react';
import { Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AuthForm from './AuthForm';
import { signUp } from '../../actions';

function SignUp({ auth, error, ...props }) {
  const history = useHistory();

  const onSubmit = async () => {
    const res = await props.signUp(auth.values);
    history.push(res.redirectTo);
  };

  return (
    <>
      <h2>Create your account</h2>
      {/* <h3>{'We recommend to Sing up with Google account - '}<GoogleAuth text="Sign Up with Google" size="tiny"/></h3> */}
      <Divider />
      <h3>You can create account using your Email</h3>
      <AuthForm
        typeOfAuth="signup"
        onSubmit={onSubmit}
        errorText={error}
        buttonText="Sign Up"
      />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.form.authUserForm,
    error: state.auth.error,
  };
};

export default connect(mapStateToProps, { signUp })(SignUp);
