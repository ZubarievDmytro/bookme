import React from 'react';
import { Divider } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import AuthForm from '../../shared/components/authForm';

const SignUp = ({ auth, error, ...props }) => {
  const history = useHistory();

  const onSubmit = async () => {
    const res = await props.signUp(auth.values);
    history.push(res.redirectTo);
  };

  return (
    <>
      <h2>Create your account</h2>
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
};

export default SignUp;
