const User = require('../models/user');
const Booking = require('../models/booking');

exports.getUsers = function(req, res, next) {
    User.find({}, function(err, users) {
        var userMap = {};
    
        users.filter(user => user.visible !== false).forEach(function(user) {
          userMap[user._id] = user;
        });
    
        res.send(userMap);  
      });
}

exports.getUserById = function(req, res, next) {
  const userId = req.params.id;
  User.findById(userId)
    .populate({
      path: 'bookings',
      populate: {
        path: 'user',
        model: 'user'
      }
    })
    .then((user) => {
      res.send(user);  
    });
}

exports.updateUserById = function(req, res, next) {
  const userId = req.params.id;
  var name = req.body.name;
  var avatarUrl = req.body.avatarUrl;
  var description = req.body.description;
  var profession = req.body.profession;
  var visible = req.body.visible;
  var schedule = [req.body.from, req.body.to];

  User.findByIdAndUpdate(userId, 
    { name, avatarUrl, description, profession, visible, schedule },
    { new: true })
    .populate({
      path: 'bookings',
      populate: {
        path: 'user',
        model: 'user'
      }
    })
    .then((err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    })
}

exports.deleteUser = function(req, res, next){
  const userId = req.params.id;
  User.findByIdAndRemove(userId)
  .then(user => res.send(user));

}

exports.fetchBookingsById = function(req, res, next) {
  const email = req.headers['email'];
  Booking.find({email: email})
    .populate('user')
    .then((bookings) => {
      res.send(bookings);  
    });
}

exports.saveBooking = function(req, res, next) {
  const userId = req.params.id;
  const userBooking = req.body.user;

  User.findById(userId, function(err, user) {
    if (err) { return next(err);}
    const booking = new Booking({
      user: user._id,
      date: req.body.date,
      time: req.body.time,
      name: userBooking.name,
      email: userBooking.email
    })
    user.bookings.push(booking);
    
    Promise.all([user.save(), booking.save()])
      .then((result) => {
        result[1].user = result[0];
        res.send(result);
    })
  })
}

exports.deleteBooking = function(req, res, next) {
  const userId = req.params.id;
  const booking = req.body;

  User.findById(userId)
  .populate('bookings')
    .then((user) => {
      user.bookings.filter(book => {
        return booking._id == book['_id']
      })[0].remove();
      user.bookings.pull(booking._id);
      user.save()
      .then(result => res.send([result, booking._id]));
  })
}