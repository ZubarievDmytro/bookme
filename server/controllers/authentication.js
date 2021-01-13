const jwt = require('jwt-simple');
const config = require('../config');
const User = require('../models/user');
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client('933713769986-sc19lpemkpj7p3kmq4l4d1knekrr1q7i.apps.googleusercontent.com')

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(user, res) {
    res.send({token: tokenForUser(user), userId: user._id, user: user})
}
exports.signinGoogle = async (req, res) => {
    const { token } = req.body.headers;
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: '933713769986-sc19lpemkpj7p3kmq4l4d1knekrr1q7i.apps.googleusercontent.com'
    });
    const { name, email, picture } = ticket.getPayload();    
    User.findOne({ email: email }).populate({
        path: 'bookings',
        populate: {
          path: 'user',
          model: 'user',
        },
      }).then((user) => {
  
        if (!user) {
          return res.json({ error: 'You need to register first' })
        }
  
        res.send({token: tokenForUser(user), userId: user._id, user: user})
      })
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

            res.json({token: tokenForUser(user), userId: user._id, user: user});
        });
    });
}