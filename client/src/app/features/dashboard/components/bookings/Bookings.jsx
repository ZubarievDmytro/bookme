import React, { useState, useEffect } from 'react';
import { Card, Icon, Message } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import UserModal from '../../../../shared/components/userModal/index.ts';
import { deleteBooking } from '../../../../shared/components/authForm/authSlice';

const Bookings = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const fetchedBookings = useSelector((state) => state.auth.bookings);
  const signedInUserBookings = useSelector((state) => state.auth.user.bookings);
  const [book, setBook] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({ status: '', text: '' });

  useEffect(() => {
    let timeout;
    if (message.text) {
      timeout = setTimeout(() => {
        setMessage({ status: '', text: '' });
      }, 4000);
    }

    return () => clearTimeout(timeout);
  }, [message.text]);

  const onDeleteClick = (booking) => {
    setOpen(true);
    setBook(booking);
  };

  const onModalClick = (status) => {
    if (status === 'yes') {
      setOpen(false);
      setBook(null);
      dispatch(deleteBooking(book, token))
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
            data-testid="delete_booking"
          />
        )}
      </p>
    );
  };

  const renderContent = (bookingType, title) => {
    let bookings = [...signedInUserBookings];
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
        <Card.Group itemsPerRow={3} className={bookingType}>
          {bookings}
        </Card.Group>
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
};

export default Bookings;
