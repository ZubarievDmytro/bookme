const assert = require('assert');
const User = require('../models/user');

describe('Validataion records', () => {
    it('Requires a user name', () => {
        const user = new User({ name: undefined });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;
        assert(message === 'Name is required.')
    })

    it('requires user name longer then 2 characters', () => {
        const user = new User({ name: 'Al' });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;
        assert(message === 'Name must be longer than two characters')
    })

    it('disallows  invalid records to saved', (done) => {
        const user = new User({ name: 'Al' });
        user.save()
            .catch((validationResult) => {
                const { message } = validationResult.errors.name;

                assert(message === 'Name must be longer than two characters');

                done();
            })
    })
})