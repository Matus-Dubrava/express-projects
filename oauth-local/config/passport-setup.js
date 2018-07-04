const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user-model');

// user object serialization
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// deserialize user based on provided id
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    });
});

passport.use(new LocalStrategy(
  (username, password, done) => {
    // check if the user with username obtained from form exists in our database
    User.findOne({ username })
      .then((user) => {
        // user is not in our database
        if (!user) { return done(null, false, { message: 'incorrect username' }) }

        user.verifyPassword(password, (err, isMatch) => {
          // check for errors during password comparison
          if (err) { return done(null, false, { message: 'internal error' }) }

          // check for incorrect password
          if (!isMatch) { return done(null, false, { message: 'incorrect password' }); }

          // if everything went well return user object
          return done(null, user, { message: 'authentication was successful' });
        });
      });
  }
));
