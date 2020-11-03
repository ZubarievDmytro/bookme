import React, { useState, useEffect } from 'react';
import { Card, Icon, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { deleteBooking } from '../../actions';
import UserModal from '../user/UserModal';

function Bookings(props) {
  const [book, setBook] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({ status: '', text: '' });

  useEffect(() => {
    if (message.text) {
      setTimeout(() => {
        setMessage({ status: '', text: '' });
      }, 4000);
    }
  }, [message.text]);

  const onDeleteClick = (booking) => {
    setOpen(true);
    setBook(booking);
  };

  const onModalClick = (status) => {
    if (status === 'yes') {
      setOpen(false);
      setBook(null);

      props
        .deleteBooking(book, props.token)
        .then(() => {
          setMessage({
            status: 'success',
            text: `You successfully removed ${book.user.name} on ${book.time}:00 ${book.date}`,
          });
        })
        .catch(() => {
          setMessage({
            status: 'negative',
            text: 'Something went wrong. Please try again.',
          });
        });
    } else {
      setOpen(false);
      setBook(null);
    }
  };

  const renderTime = (booking, bookingType) => {
    const formatedTime = `${booking.time}:00 - ${+booking.time + 1}:00`;
    return (
      <p>
        {formatedTime}{' '}
        {bookingType === 'fetchedBookings' && (
          <Icon
            onClick={() => onDeleteClick(booking)}
            floated="right"
            color="red"
            name="window close outline"
          />
        )}
      </p>
    );
  };

  const renderContent = (bookingType, title) => {
    let { bookings } = props;
    const { fetchedBookings } = props;
    if (bookingType === 'fetchedBookings') {
      bookings = fetchedBookings.length ? fetchedBookings : [];
    }

    bookings =
      bookings.length &&
      bookings.map((bookItem) => {
        let userName = bookItem.name;
        if (bookingType === 'fetchedBookings') userName = bookItem.user.name;

        const { date } = bookItem;
        return (
          <Card key={bookItem.id}>
            <Card.Content>
              <Card.Header>{userName}</Card.Header>
              <Card.Meta>{date}</Card.Meta>
              <Card.Description>
                {renderTime(bookItem, bookingType)}
              </Card.Description>
            </Card.Content>
          </Card>
        );
      });
    if (!bookings.length) {
      bookings = (
        <Card>
          <Card.Content>No bookings yet</Card.Content>
        </Card>
      );
    }

    return (
      <>
        <h3>{title}</h3>
        <Card.Group itemsPerRow={3}>{bookings}</Card.Group>
      </>
    );
  };

  return (
    <div>
      <Message
        className={message.status}
        content={message.text}
        hidden={!message.text}
      />
      {renderContent('fetchedBookings', 'My Bookings')}
      {renderContent('bookings', 'Users booked me')}
      <UserModal open={open} text="booking" onModalClick={onModalClick} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    bookings: state.users.signedInUser.bookings || [],
    fetchedBookings: state.users.fetchedBookings,
    token: state.auth.token,
  };
};
export default connect(mapStateToProps, { deleteBooking })(Bookings);
