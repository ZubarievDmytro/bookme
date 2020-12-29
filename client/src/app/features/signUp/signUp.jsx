import React from 'react';
import { Divider } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AuthForm from '../../shared/components/authForm';
import { authUser } from '../../shared/components/authForm/authSlice';

const SignUp = () => {
  const history = useHistory();
  const authUserForm = useSelector((state) => state.form.authUserForm);
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();
  const onSubmit = async () => {
    const res = await dispatch(authUser(authUserForm.values, 'signup'));
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
