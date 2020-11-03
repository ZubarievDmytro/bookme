import React from 'react';
import { Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import AuthForm from './AuthForm';
import { signIn } from '../../actions';

function SignIn(props) {
  const { error } = props;
  const onSubmit = () => {
    props.signIn(props.auth.values);
  };

  return (
    <>
      <h2>Sign in to your account</h2>
      {/* <GoogleAuth text="Sign In with Google" size="tiny"/> */}
      <Divider />
      <AuthForm
        typeOfAuth="signin"
        errorText={error}
        onSubmit={onSubmit}
        buttonText="Sign In"
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

export default connect(mapStateToProps, { signIn })(SignIn);
