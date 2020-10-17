const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
    mongoose.connect('mongodb://127.0.0.1:27017/users_test', {useNewUrlParser: true, useUnifiedTopology: true });

    mongoose.connection
    .once('open', () => done())
    .on('error', error => console.warn('Warning', error));
})

beforeEach((done) => {
    const { users, bookings } = mongoose.connection.collections;
    users.drop(() => {
        bookings.drop(() => {
            done();
        });
    });
})