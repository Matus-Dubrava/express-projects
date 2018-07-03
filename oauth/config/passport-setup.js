const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
  // singnature (error, data to serialize)
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    });
});

passport.use(new GoogleStrategy({
  // options for strategy
  // taken from google apis
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret,
  callbackURL: '/auth/google/redirect'
}, (accessToken, refreshToken, profile, done) => {
  // check if user already exists in our database

  User.findOne({ googleId: profile.id })
    .then((currentUser) => {
      if (currentUser) {
        // already have the user
        console.log('current user is: ' + currentUser);
        done(null, currentUser); // <- pass current user to serialize functio
      } else {
        // if not create user in our database
        new User({
          username: profile.displayName,
          googleId: profile.id
        }).save().then((newUser) => {
          console.log('new user created: ' + newUser);
          done(null, newUser) // <- pass new user to serialize function
        });
      }
    });
}));
