const router = require('express').Router();
const passport = require('passport');

const User = require('../models/user-model');

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/login', (req, res) => {
  res.render('login');
});

// handle registration process
router.post('/register', (req, res, next) => {
  // obtain username and passwords from posted form
  const username = req.body.username.trim(),
        password = req.body.password.trim(),
        password1 = req.body.password1.trim();

  // check whether provided password and reapeated password match
  // if not, redirect back to register page
  if (password !== password1) { return res.redirect('/auth/register'); }

  // try to find a user with the same name as the one passed with form
  User.findOne({ username })
    .then((user) => {
      // if user with the same username already exists in our database
      // redirect back to login
      if (user) { return res.redirect('/auth/register'); }

      // create a new user object and store it in our database
      // and redirect to profile page afterwards
      new User({ username, password }).save(next);
    });
}, passport.authenticate('local'), (req, res) => {
  res.redirect(`/profile/${req.user.username}`);
});

// handle login process via passport
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login'
}));

// logout currently authenticated user and redirect to home page
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
