const mongoose = require('mongoose');
const User = require('../models/user');
const Booking = require('../models/booking');
const assert = require('assert');

describe('Associations', () => {
    let joe, joe2, booking;
    beforeEach(done => {
        joe = new User({name: 'Joe'});
        joe2 = new User({name: 'Joe 2'});
        booking = new Booking({
            date: new Date(2020, 8, 26, 13, 0, 0, 0),
            refUser: joe2
        });

        joe.booking.push(booking);
        booking.user = joe;

        Promise.all([joe.save(), joe2.save(), booking.save()])
            .then(() => {
                done();
            })
    })

    it('saves a relation between user and booking', done => {
        User.findOne({name: 'Joe'})
            .populate({
                path: 'booking',
                populate: {
                    path: 'refUser',
                    model: 'user'
                }
            })
            .then(user => {
                console.log(user)
                console.log(user.booking[0].refUser.name)
                assert(user.booking[0].date = new Date(2020, 8, 26, 13, 0, 0, 0))
                done();
            })
    })
  
})