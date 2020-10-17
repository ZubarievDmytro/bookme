const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const PostSchema = require('./post');

const userSchema = new Schema({
    email: { type: String, unique: true },
    password: { type: String },
    avatarUrl: String,
    description: String,
    profession: String,
    visible: Boolean,
    schedule: [String],
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than two characters'
        }
    },
    bookings: [{
        type: Schema.Types.ObjectId,
        ref: 'booking'
    }]
})

userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) return next();
  
    bcrypt.genSalt(10, function(err, salt) {
        if (err) { return next(err); }
        
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) { return next(err); }

            user.password = hash;
            next();
        })
    }) 
})

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) { return callback(err); }

        callback(null, isMatch);
    })
}

userSchema.virtual('postCount').get(function() {
    return this.posts.length;
});

const User = mongoose.model('user', userSchema);

module.exports = User;