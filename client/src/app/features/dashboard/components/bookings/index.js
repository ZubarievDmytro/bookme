import { connect } from 'react-redux';
import { deleteBooking } from '../../../../../actions';
import Bookings from './Bookings';

const mapStateToProps = (state) => {
  return {
    bookings: state.users.signedInUser.bookings || [],
    fetchedBookings: state.users.fetchedBookings,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps, { deleteBooking })(Bookings);
