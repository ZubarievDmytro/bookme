const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    date: String,
    time: String,
    name: String,
    email: String
})

const Booking = mongoose.model('booking', BookingSchema);

module.exports = Booking;