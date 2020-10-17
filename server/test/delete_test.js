const assert = require('assert');
const User = require('../models/user');

describe('Deleting user', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        joe.save()
            .then(() => done())
    })

    it('model instance remove', (done) => {
        joe.remove()
            .then(() => User.findOne({_id: joe._id}))
            .then((user) => {
                assert(user === null);
                done();
            })

    })
    it('class method remove', (done) => {
        User.remove({ name: 'Joe' })
            .then(() => User.findOne({_id: joe._id}))
            .then((user) => {
                assert(user === null);
                done();
            })
    })
    it('class method find one and remove', (done) => {
        User.findOneAndRemove({ name: 'Joe' })
        .then(() => User.findOne({_id: joe._id}))
        .then((user) => {
            assert(user === null);
            done();
        })
    })
    it('class method find by id and remove', (done) => {
        User.findByIdAndRemove(joe._id)
        .then(() => User.findOne({_id: joe._id}))
        .then((user) => {
            assert(user === null);
            done();
        })
    })
})