const assert = require('assert');
const User = require('../models/user');

describe('Virtual types', () => {
    xit('postCount returns nimber of posts', done => {
        const joe = new User({ name: 'Joe', posts: [{title: 'Post #1'}] });

        joe.save()
            .then(() => User.findOne({name: 'Joe'}))
            .then(user => {
                assert(joe.postCount === 1);
                done();
            })
    })
})