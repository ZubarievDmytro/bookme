const Authentication = require('./controllers/authentication');
const Users = require('./controllers/users');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
module.exports = function (app){
    app.get('/', function(req, res) {
        res.send({'hi': 'there'})
    })

    app.get('/users', Users.getUsers);
    app.get('/users/:id', Users.getUserById);
    app.get('/users/dashboard/:id', requireAuth, Users.getUserById);
    app.patch('/users/:id', requireAuth, Users.updateUserById);
    app.delete('/users/delete/:id', requireAuth, Users.deleteUser);

    app.get('/bookings/', Users.fetchBookingsById);
    app.post('/bookings/:id', Users.saveBooking);
    app.patch('/bookings/:id', requireAuth, Users.deleteBooking);

    app.post('/signin', function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
          if (err) { return next(err); }
          if (!user) { 
            res.json({error: info.message})
            return;
          }
          Authentication.signin(user, res);
        })(req, res, next)
    })
    
    app.post('/signup', Authentication.signup);
   
    app.post("/signinGoogle", Authentication.signinGoogle);
}