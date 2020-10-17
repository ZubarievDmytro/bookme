const jwt = require('jwt-simple');
const config = require('../config');
const User = require('../models/user');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(user, res) {
    res.send({token: tokenForUser(user), userId: user._id})
}

exports.signup = function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const visible = false;

    if ( !email || !password) {
        return res.status(422).send({error: 'You must provide email and password'})
    }
    User.findOne({ email: email }, function(err, existingUser) {
        if (err) { return next(err);}

        if (existingUser) {
            return res.json({ error: 'Email is in use' })
        }

        const user = new User({
            email,
            password,
            visible
        });

        user.save(function(err) {
            if (err) { return next(err); }

            res.json({token: tokenForUser(user), userId: user._id});
        });
    });
}