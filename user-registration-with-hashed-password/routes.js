const express = require('express');

const User = require('./models/user.js');

const router = express.Router();

router.get('/', (req, res) => {
  User.find()
    .then(users => {
      res.render('index', { users });
    })
    .catch(e => {
      res.render('500');
    });
});

router.get('/register', (req, res) => {
  res.render('register', { flashed: '' });
});

router.post('/register', (req, res) => {
  const username = req.body.username.trim(),
        password = req.body.password.trim(),
        password1 = req.body.password1.trim(),
        user = new User({ username, password });

  if (password !== password1) {
    res.render('register', { flashed: 'Passwords do not match.' });
    return;
  }

  User.findOne({ username })
    .then(existingUser => {
      if (existingUser) {
        res.render('register', { flashed: 'Username already taken.' });
        return;
      } else {
        user.save()
          .catch(e => {
            res.render('500');
            return;
          });
        res.redirect('/');
      }
    })
    .catch(e => {
      res.render('500');
    });
});


module.exports = router;
