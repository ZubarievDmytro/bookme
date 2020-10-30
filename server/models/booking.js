const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    date: String,
    time: String,
    name: String,
    email: String,
  },
  {
    toObject: {
      transform: (doc, obj) => {
        obj.id = obj._id;
        delete obj._id;
      },
    },
    toJSON: {
      transform: (doc, obj) => {
        obj.id = obj._id;
        delete obj._id;
      },
    },
  }
);

const Booking = mongoose.model('booking', BookingSchema);

module.exports = Booking;
