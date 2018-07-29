const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const log = require('debug')('app:passport-setup');
const error = require('debug')('app:error');

const User = require('../models/user-rest');

passport.use(new LocalStrategy({
  usernameField: 'email'
}, (username, password, done) => {
  User.read(username).then((user) => {
    if (!user) {
      return done(null, false, {
        message: 'Incorrect username or password.'
      });
    }

    User.checkPassword(username, password).then((match) => {
      if (!match.match) {
        return done(null, false, {
          message: 'Incorrect username or password.'
        });
      }

      return done(null, user, {
        message: `Logged in as ${user.email}.`
      });
    });
  })
  .catch((err) => done(err));
}));

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser((email, done) => {
  User.read(email).then((user) => {
    return done(null, user);
  })
  .catch((err) => done(err));
});
