import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Grid, Loader, Button } from 'semantic-ui-react';
import { Redirect, useHistory } from 'react-router-dom';
import UserForm from './components/userForm';
import UserModal from '../../shared/components/userModal/index.ts';

const DashboardEdit = (props) => {
  const [state, setState] = useState({
    open: false,
    text: 'account',
  });

  const history = useHistory();

  useEffect(() => {
    if (_.isEmpty(props.user))
      props.fetchSignedInUser(props.userId, props.token);
  });

  const onSubmit = async (formValues) => {
    const res = await props.updateUser(
      formValues,
      props.match.params.id,
      props.token
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
      const res = await props.deleteUser(props.match.params.id, props.token);
      history.push(res.redirectTo);
    } else {
      setState({
        open: false,
      });
    }
  };

  const renderForm = () => {
    const { user } = props;
    if (_.isEmpty(user)) return <Loader active size="large" />;
    const {
      avatarUrl,
      description,
      name,
      profession,
      visible,
      schedule,
    } = user;
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
}

export default DashboardEdit;
