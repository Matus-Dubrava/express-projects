const router = require('express').Router();
const passport = require('passport');

// middleware function that check whether currently authenticated user is the
// the one whose profile is being queried
const verifyUser = (req, res, next) => {
  if (!req.user || req.user.username !== req.params.username) {
    return res.redirect('/');
  }

  // continue if verification was successful
  next();
};

// get user's profile page
router.get('/:username', verifyUser, (req, res) => {
  res.render('profile');
});

module.exports = router;
