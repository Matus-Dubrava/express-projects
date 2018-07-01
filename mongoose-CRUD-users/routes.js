const express = require('express');
const mongoose = require('mongoose');

const User = require('./models/user.js');

const router = express.Router();

router.get('/list', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(500).send('500 Error!');
      return;
    }

    if (users.length === 0) {
      res.send('no users has been registered yet');
      return;
    }

    res.json(users);
  });
});

router.get('/create/:username/:bio', (req, res) => {
  const user = new User({
    username: req.params.username,
    bio: req.params.bio
  });

  user.save();

  res.redirect('/users/list');
});

router.get('/:username', (req, res) => {
  User.findOne({ username: req.params.username }, (err, user) => {
    if (err) {
      res.send('500 Error!');
      return;
    }
    if (!user) {
      res.send('404 Error! No such user');
      return;
    }

    res.json(user);
  });
});

router.get('/edit/:username/:bio', (req, res) => {
  User.findOne({ username: req.params.username }, (err, user) => {
    if (err) {
      res.send('500 Error!');
      return;
    }
    if (!user) {
      res.send('404 Error! No such user');
      return;
    }

    user.bio = req.params.bio;
    user.save();
    res.redirect('/users/list');
  });
});

router.get('/delete/:username', (req, res) => {
  User.findOneAndDelete({ username: req.params.username }, (err, user) => {
    if (err) {
      res.send('500 Error!');
      return;
    }
    if (!user) {
      res.send('404 Error! No such user');
      return;
    }
    res.redirect('/users/list');
  });
});


module.exports = router;
