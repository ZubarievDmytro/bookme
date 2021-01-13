import React from 'react';
import _ from 'lodash';
import { Link, Redirect } from 'react-router-dom';
import { Button, Grid, Loader } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import Bookings from './components/bookings';
import UserCard from '../../shared/components/userCard';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const imConfig = {
    location: 'outside',
  };

  const renderContent = () => {
    if (_.isEmpty(user)) return <Loader active size="large" />;

    return (
      <Grid columns="two" divided>
        <Grid.Column width={5}>
          <UserCard user={user} imConfig={imConfig}>
            <Button
              content="Edit profile information"
              as={Link}
              to={`/dashboard/edit/${user.id}`}
            />
          </UserCard>
        </Grid.Column>
        <Grid.Column width={11}>
          <Bookings />
        </Grid.Column>
      </Grid>
    );
  };

  return (
    <div>
      {!localStorage.getItem('token') && <Redirect to="/" />}
      <h1>Dashboard</h1>
      {renderContent()}
    </div>
  );
};

export default Dashboard;
