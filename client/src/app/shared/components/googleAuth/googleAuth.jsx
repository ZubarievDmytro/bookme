import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { authUser } from '../authForm/authSlice';

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const authError = useSelector((state) => state.auth.error);
  const responseGoogle = async (googleData) => {
    const res = await dispatch(authUser(googleData, 'google'));

    history.push(res.redirectTo);
  };
  return (
    <>
      <GoogleLogin
        clientId="933713769986-sc19lpemkpj7p3kmq4l4d1knekrr1q7i.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy="single_host_origin"
        isSignedIn={authError}
      />
    </>
  );
};

export default GoogleAuth;
