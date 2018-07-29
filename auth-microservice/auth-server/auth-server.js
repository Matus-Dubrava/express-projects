const restify = require('restify');
const log = require('debug')('auth-server:auth-server');
const error = require('debug')('auth-server:error');
const mongoose = require('mongoose');
const util = require('util');

const User = require('./models/user-model');

function sanitizeUser(user) {
  return {
    email: user.email,
    username: user.username,
    bio: user.bio
  };
}

mongoose.connect(process.env.DB_URI || 'mongodb://localhost:27017/authmicro',
  () => {
    log('Connection to database established.');
  })
  .catch((err) => { log(err); });

const port = process.env.AUTH_PORT || 3001;

const server = restify.createServer({
  name: 'Authentication server',
  version: '*'
});

server.use(restify.plugins.bodyParser({
  mapParams: true
}));

server.use(restify.plugins.queryParser({
  mapParams: true
}));

server.pre((req, res, next) => {
  log(`${req.method} - ${req.url}`);
  return next();
});

server.post('/create', (req, res, next) => {
  const email = req.params.email.trim(),
        username = req.params.username.trim(),
        password = req.params.password.trim(),
        bio = req.params.bio.trim() || '',
        newUser = new User({ email, username, password, bio });

  if (!email) { return next(new Error('Email is required.')); }
  if (!username) { return next(new Error('Username is required')); }
  if (!password) { return next(new Error('Password is required')); }

  User.findOne({ email }).then((user) => {
    if (user) { return next(new Error(`Email ${email} is already in use.`)); }

    newUser.save().then((user) => {
      return res.send(201, sanitizeUser(user));
    })
  })
  .catch(next);
});

server.post('/update/:email', (req, res, next) => {
  const username = req.params.username.trim(),
        password = req.params.password.trim(),
        bio = req.params.bio.trim(),
        email = req.params.email.trim();

  User.findOne({ email }).then((user) => {
    if (!user) { return next(new Error(
      `No user with email: ${email} has been found.`)); }

    if (username) { user.username = username; }
    if (password) { user.password = password; }
    if (bio) { user.bio = bio; }

    user.save().then((user) => res.send(sanitizeUser(user)));
  })
  .catch(next);
});

server.del('/destroy/:email', (req, res, next) => {
  User.findOneAndRemove({ email: req.params.email }).then((user) => {
    res.send(204, sanitizeUser(user));
  })
  .catch(next);
});

server.get('/', (req, res, next) => {
  User.find({}).then((users) => {
    res.send(users.map(sanitizeUser));
  })
  .catch(next);
});

server.get('/:email', (req, res, next) => {
  User.findOne({ email: req.params.email }).then((user) => {
    res.send(sanitizeUser(user));
  })
  .catch(next);
});

server.post('/check-password', (req, res, next) => {
  const email = req.params.email,
        password = req.params.password;

  User.findOne({ email }).then((user) => {
    if (!user) { return res.send({ match: false }); }

    user.checkPassword(password, (err, match) => {
      if (err) { return next(err); }
      return res.send({ match });
    });
  })
  .catch(next);
});


server.listen(port, () => {
  log(`Authentication server started listening on port ${port}.`);
});
