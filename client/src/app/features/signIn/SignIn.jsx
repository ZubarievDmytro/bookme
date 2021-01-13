import React from 'react';
import { Divider } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AuthForm from '../../shared/components/authForm';
import { authUser } from '../../shared/components/authForm/authSlice';
import GoogleAuth from '../../shared/components/googleAuth';

const SignIn = () => {
  const authUserForm = useSelector((state) => state.form.authUserForm);
  const error = useSelector((state) => state.auth.error);
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = async (type = 'signin') => {
    const res = await dispatch(authUser(authUserForm.values, type));

    history.push(res.redirectTo);
  };

  return (
    <>
      <h2>Sign in to your account</h2>
      <Divider />
      <GoogleAuth />
      <br />
      <br />
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
