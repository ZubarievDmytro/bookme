import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { Link, Redirect } from 'react-router-dom';
import { Card, Image, Button, Grid, Loader } from 'semantic-ui-react';
import Bookings from './components/bookings';

const Dashboard = (props) => {
  const placeholderInfo = {
    name: 'Your name will be here',
    description: 'No description yet',
    avatarUrl: 'https://simpleicon.com/wp-content/uploads/account.png',
  };
  const [state, setState] = useState('loading');

  useEffect(() => {
    if (_.isEmpty(props.user))
      props.fetchSignedInUser(props.userId, props.token);
  });

  const handleImageLoad = () => {
    setState('loaded');
  };

  const renderAvatar = (user) => {
    return (
      <>
        {state === 'loading' && (
          <div style={{ margin: '10px 0' }}>
            <Loader active inline="centered" size="medium" />
          </div>
        )}
        <Image
          src={user.avatarUrl || placeholderInfo.avatarUrl}
          wrapped
          ui={false}
          onLoad={() => handleImageLoad()}
        />
      </>
    );
  };

  const renderContent = () => {
    const { user } = props;
    if (_.isEmpty(user)) return <Loader active size="large" />;

    if (user) {
      return (
        <Grid columns="two" divided>
          <Grid.Column width={5}>
            <Card>
              {renderAvatar(user)}
              <Card.Content>
                <Card.Header>{user.name || placeholderInfo.name}</Card.Header>
                <Card.Description>
                  {user.description || placeholderInfo.description}
                </Card.Description>
              </Card.Content>
            </Card>
            <Button as={Link} to={`/dashboard/edit/${user.id}`}>
              Edit profile information
            </Button>
          </Grid.Column>
          <Grid.Column width={11}>
            <Bookings />
          </Grid.Column>
        </Grid>
      );
    }
    return null;
  };

  return (
    <div>
      {!localStorage.getItem('token') && <Redirect to="/" />}
      <h1>Dashboard</h1>
      {renderContent()}
    </div>
  );
};

export default Dashboard
