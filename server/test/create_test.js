const assert = require('assert');
const User = require('../models/user');

describe('Creating records', () => {
    it('saves a user', (done) => {
        const joe = new User({name: 'Joe'});

        joe.save()
            .then(() => {
                assert(!joe.isNew);
                done();
            });
    })
});