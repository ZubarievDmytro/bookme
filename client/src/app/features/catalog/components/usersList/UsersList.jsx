import React, { useEffect } from 'react';
import { Card, Button, Image, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const UsersList = (props) => {
  const { users, userId } = props;
  useEffect(() => {
    if (!users.length) props.fetchUsers();
  });

  const renderUsers = () => {
    if (!users.length) return <Loader active size="large" />;

    return users.map((user) => {
      return (
        <Card key={user.id} as={Link} to={`/users/${user.id}`}>
          <Card.Content>
            <Image circular floated="right" size="mini" src={user.avatarUrl} />
            <Card.Header>{user.name}</Card.Header>
            <Card.Meta>{user.profession}</Card.Meta>
            <Card.Description>{user.description}</Card.Description>
          </Card.Content>
          {userId !== user.id && (
            <Card.Content extra>
              <Button basic color="green" floated="right">
                Book me
              </Button>
            </Card.Content>
          )}
        </Card>
      );
    });
  };

  return <Card.Group itemsPerRow={3}>{renderUsers()}</Card.Group>;
};

export default UsersList;
