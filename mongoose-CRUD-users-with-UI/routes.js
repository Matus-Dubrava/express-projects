const express = require('express');

const User = require('./models/user.js');

const router = express.Router();

router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.render('500');
      return;
    }

    res.render('index', { users });
  });
});

router.get('/register', (req, res) => {
  res.render('register', { flashed: '' });
});

router.post('/register', (req, res) => {
  const username = req.body.username.trim(),
        password = req.body.password.trim(),
        bio = req.body.bio.trim(),
        createdAt = new Date(),
        user = new User({ username, password, bio, createdAt });

  User.findOne({ username }, (err, oldUser) => {
    if (err) {
      res.status(500).render('500');
      return;
    }

    if (oldUser) {
      res.render('register', { flashed: 'Username is already taken.' })
      return;
    }

    user.save();
    res.redirect('/');
  });
});

router.get('/edit-user/:username', (req, res) => {
  User.findOne({ username: req.params.username }, (err, user) => {
    if (err) {
      res.status(500).render('500');
      return;
    }

    if (!user) {
      res.status(404).render('404');
      return;
    }

    res.render('edit', {
      user,
      flashed: ''
    });
  });
});

router.post('/edit-user/:username', (req, res) => {
  User.findOne({ username: req.params.username }, (err, user) => {
    if (err) {
      res.status(500).render('500');
      return;
    }

    if (!user) {
      res.status(404).render('404');
      return;
    }

    const oldName = user.username;

    user.username = req.body.username.trim();
    user.bio = req.body.bio.trim();

    user.save((err, modifiedUser) => {
      if (err) {
        user.username = oldName;
        res.render('edit', {
          user,
          flashed: 'Username is already taken.'
        });
        return;
      } else {
        res.render('user', { user });
      }
    });
  });
});

router.get('/delete-user/:username', (req, res) => {
  User.findOneAndDelete({ username: req.params.username }, (err, user) => {
    if (err) {
      res.status(500).render('500');
      return;
    }

    if (!user) {
      res.status(404).render('404');
      return;
    }

    res.redirect('/');
  });
});

router.get('/:username', (req, res) => {
  User.findOne({ username: req.params.username }, (err, user) => {
    if (err) {
      res.status(500).render('500');
      return;
    }

    if (!user) {
      res.status(404).render('404');
      return;
    }

    res.render('user', { user });
  });
});

module.exports = router;
