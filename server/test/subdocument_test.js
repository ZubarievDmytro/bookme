const assert = require('assert');
const User = require('../models/user');

describe('Subdocuments', () => {
    xit('can create a subdocument', (done) => {
        const joe = new User({name: 'Joe', posts: [{title: 'Post #1'}]});

        joe.save()
            .then(() => User.findOne({name: 'Joe'}))
            .then(user => {
                assert(user.posts[0].title === 'Post #1');
                done();
            })
    })

    xit('can add a subdocument to an existing record', (done) => {
        const joe = new User({name: 'Joe', posts: []});

        joe.save()
            .then(() => User.findOne({name: 'Joe'}))
            .then(user => {
                user.posts.push({title: 'Post #1'});
                return user.save();
            })
            .then(() => User.findOne({name: 'Joe'}))
            .then(user => {
                assert(user.posts[0].title === 'Post #1');
                done();
            })
    })

    xit('can remove a subdocument', (done) => {
        const joe = new User({ name: 'Joe', posts: [{title: 'Post #1'}]});

        joe.save()
            .then(() => User.findOne({name: 'Joe'}))
            .then(user => {
                const post = user.posts[0]; 
                post.remove();

                return user.save();
            })
            .then(() => User.findOne({name: 'Joe'}))
            .then(user => {
                assert(user.posts.length === 0);
                done();
            })
    })
})