import React, { useEffect } from 'react';
import { Card, Button, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, selectUsers } from '../../catalogSlice';
import UserCard from '../../../../shared/components/userCard';

const UsersList = () => {
  const userId = localStorage.getItem('userId');
  const users = Object.values(useSelector(selectUsers));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!users.length) dispatch(fetchUsers());
  }, [dispatch, users.length]);

  const renderUsers = () => {
    if (!users.length) return <Loader active size="large" />;

    return users.map((user) => {
      return (
        <UserCard key={user.id} user={user} as={Link} to={`/users/${user.id}`}>
          {userId !== user.id && (
            <Card.Content extra>
              <Button basic color="green" floated="right" content="Book me" />
            </Card.Content>
          )}
        </UserCard>
      );
    });
  };

  return <Card.Group itemsPerRow={3}>{renderUsers()}</Card.Group>;
};

export default UsersList;
