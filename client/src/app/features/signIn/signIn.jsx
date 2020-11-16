import React from 'react';
import { Divider } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import AuthForm from '../../shared/components/authForm';

const SignIn = (props) => {
  const { error } = props;
  const history = useHistory();
  const onSubmit = async () => {
    const res = await props.signIn(props.auth.values);

    history.push(res.redirectTo);
  };

  return (
    <>
      <h2>Sign in to your account</h2>
      <Divider />
      <AuthForm
        typeOfAuth="signin"
        errorText={error}
        onSubmit={onSubmit}
        buttonText="Sign In"
      />
    </>
  );
};

export default SignIn;
