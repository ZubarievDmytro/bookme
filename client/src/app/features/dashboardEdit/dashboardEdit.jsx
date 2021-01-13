import React, { useState } from 'react';
import _ from 'lodash';
import { Grid, Loader, Button } from 'semantic-ui-react';
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import UserForm from './components/userForm';
import UserModal from '../../shared/components/userModal/index.ts';
import {
  deleteUser,
  updateUser,
} from '../../shared/components/authForm/authSlice';

const DashboardEdit = (props) => {
  const dispatch = useDispatch();
  const authInfo = useSelector((state) => state.auth);
  const history = useHistory();
  const [state, setState] = useState({
    open: false,
    text: 'account',
  });

  const onSubmit = async (formValues) => {
    const res = await dispatch(
      updateUser(formValues, props.match.params.id, authInfo.token)
    );

    history.push(res.redirectTo);
  };

  const onDeleteClick = () => {
    setState({
      open: true,
    });
  };

  const onModalClick = async (status) => {
    if (status === 'yes') {
      setState({
        open: false,
      });
      const res = await dispatch(
        deleteUser(props.match.params.id, authInfo.token)
      );
      history.push(res.redirectTo);
    } else {
      setState({
        open: false,
      });
    }
  };

  const renderForm = () => {
    if (_.isEmpty(authInfo.user)) return <Loader active size="large" />;
    const {
      avatarUrl,
      description,
      name,
      profession,
      visible,
      schedule,
    } = authInfo.user;
    const initialValues = {
      avatarUrl,
      description,
      name,
      profession,
      visible,
      from: +schedule[0],
      to: +schedule[1],
    };
    return (
      <Grid columns="two" divided>
        <Grid.Column width={8}>
          <UserForm onSubmit={onSubmit} initialValues={initialValues} />
          <br />
          <Button
            content="Delete Account"
            negative
            size="tiny"
            onClick={onDeleteClick}
          />
        </Grid.Column>
      </Grid>
    );
  };

  return (
    <div>
      {!localStorage.getItem('token') && <Redirect to="/" />}
      <h1>Update Your profile</h1>
      {renderForm()}
      <UserModal open={state.open} text="account" onModalClick={onModalClick} />
    </div>
  );
};

export default DashboardEdit;
