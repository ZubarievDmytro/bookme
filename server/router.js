const Authentication = require('./controllers/authentication');
const Users = require('./controllers/users');

const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', {session: false})
module.exports = function (app){
    app.get('/', function(req, res) {
        res.send({'hi': 'there'})
    })

    app.get('/users', Users.getUsers);

    app.post('/signin', requireSignin, Authentication.signin)
    app.post('/signup', Authentication.signup);
}