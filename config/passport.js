const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

//= middleware to process login
passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, (req, email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) return done(err);

    if (!user) { return done(null, false, req.flash('loginMessage', 'User not found')); }

    if (!user.comparePassword(password)) { return done(null, false, req.flash('loginMessage', 'Password is incorrect')); }

    return done(null, user);
  });
}));

//= serialize and deserialize
// get passed user from above middleware
// serialize it to save into session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

//= get id from passport session and find it from db
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

//= custom function to validate
exports.isAutheticated = (req, res, next) => {
  if (req.isAutheticated) {
    return next();
  }

  return res.redirect('/login');
};

