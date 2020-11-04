import React, { useEffect } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Card, Image, Grid, Loader } from 'semantic-ui-react';
import { fetchUserById, saveBooking } from '../../actions';
import BookingsTable from '../layout/BookingsTable';

const UserPage = (props) => {
  const placeholderInfo = {
    avatarUrl: 'https://simpleicon.com/wp-content/uploads/account.png',
  };

  useEffect(() => {
    if (_.isEmpty(props.user) && _.isEmpty(props.fetchedUser)) {
      props.fetchUserById(props.match.params.id);
    }
  }, [props]);

  const renderUser = () => {
    const user = props.user || props.fetchedUser;
    const { signedInUser } = props;

    if (user && props.match.params.id === user.id) {
      return (
        <Grid columns="two" divided>
          <Grid.Column width={5}>
            <Card>
              <Image
                src={user.avatarUrl || placeholderInfo.avatarUrl}
                wrapped
                ui={false}
              />
              <Card.Content>
                <Card.Header>{user.name}</Card.Header>
                <Card.Description>{user.description}</Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={11}>
            <BookingsTable
              user={user}
              signedInUser={signedInUser}
              onSaveBooking={(userId, bookingInfo) =>
                props.saveBooking(userId, bookingInfo)
              }
            />
          </Grid.Column>
        </Grid>
      );
    }
    return <Loader active size="large" />;
  };

  return renderUser();
};

const mapStateToProps = (state, ownProps) => {
  return {
    fetchedUser: state.users.fetchedUser,
    signedInUser: state.users.signedInUser,
    user: state.users.usersList[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchUserById, saveBooking })(
  UserPage
);
