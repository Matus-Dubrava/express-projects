const router = require('express').Router();
const passport = require('passport');
const log = require('debug')('app:user-router');
const error = require('debug')('app:error');

const User = require('../models/user-rest');

exports.router = router;

exports.ensureAuthenticated = function(req, res, next) {
  if (req.user) { return next(); }

  req.flash('info', 'You need to log in to view this content.');
  res.redirect('/users/login');
};

router.get('/login', (req, res, next) => {
  res.render('login', {
    title: 'Login',
    messages: req.flash('info'),
    errors: req.flash('error'),
    authUser: req.user
  });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  successFlash: true,
  failureRedirect: '/users/login',
  failureFlash: true
}));

router.get('/register', (req, res, next) => {
  res.render('register', {
    title: 'Register new accout',
    messages: req.flash('info'),
    errors: req.flash('error'),
    authUser: req.user
  });
});

router.post('/register', (req, res, next) => {
  const email = req.body.email.trim(),
        username = req.body.username.trim(),
        password = req.body.password.trim(),
        password1 = req.body.password1.trim(),
        bio = req.body.bio.trim();

  if (password1 !== password) {
    req.flash('error', 'Passwords do not match.');
    error('Passwords do not match.');
    return res.redirect('/users/register');
  }

  User.create(email, username, password, bio).then((user) => {
    req.flash('info', `User ${username} has been registered.`);
    return res.redirect('/');
  })
  .catch(next);
});

router.get('/logout', (req, res, next) => {
  req.logout();
  req.flash('info', 'You have been successfuly logged out');
  res.redirect('/');
});
