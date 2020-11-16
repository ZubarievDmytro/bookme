import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Grid, Loader, Divider, Button, Message } from 'semantic-ui-react';
import DateSelector from './components/dateSelector';
import TimeSelector from './components/timeSelector';
import UserCard from '../../shared/components/userCard/index.ts';

const User = (props) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const { saveBooking, signedInUser } = props;
  const user = props.user || props.fetchedUser;
  const [message, setMessage] = useState({ status: '', text: '' });

  useEffect(() => {
    if (message.text) {
      setTimeout(() => {
        setMessage({ status: '', text: '' });
      }, 4000);
    }
  }, [message.text]);

  useEffect(() => {
    if (_.isEmpty(props.user) && _.isEmpty(props.fetchedUser)) {
      props.fetchUserById(props.match.params.id);
    }
  }, [props]);

  const onSaveBooking = () => {
    const [day, month, year] = date.split('/');
    const bookingDate = `${day}-${month}-${year}`;

    saveBooking(user.id, {
      time,
      date: bookingDate,
      user: signedInUser,
    })
      .then(() => {
        setMessage({
          status: 'success',
          text: `You successfully booked ${user.name} on ${time}:00 ${date}`,
        });
      })
      .catch(() => {
        setMessage({
          status: 'negative',
          text: 'Something went wrong. Please try again.',
        });
      });
  };

  const renderUser = () => {
    if (user && props.match.params.id === user.id) {
      return (
        <Grid columns="two" divided>
          <Grid.Column width={5}>
            <UserCard
              name={user.name}
              description={user.description}
              avatarUrl={user.avatarUrl}
            />
          </Grid.Column>
          <Grid.Column width={11}>
            <DateSelector
              user={user}
              date={date}
              signedInUser={signedInUser}
              onChange={(value) => setDate(value)}
            />
            <TimeSelector
              user={user}
              signedInUser={signedInUser}
              onChange={(value) => setTime(value)}
            />
            <Divider />
            <Message
              className={message.status}
              content={message.text}
              hidden={!message.text}
            />
            <Button
              disabled={_.isEmpty(signedInUser) || !date || !time}
              onClick={onSaveBooking}
              content="Save Booking"
            />
          </Grid.Column>
        </Grid>
      );
    }
    return <Loader active size="large" />;
  };

  return renderUser();
};

export default User;
