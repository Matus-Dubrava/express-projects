const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const path = require('path');
const logger = require('morgan');
const passport = require('passport');

const keys = require('./config/keys');
const passportSuport = require('./config/passport-setup');
const authRouter = require('./routes/auth-router');
const profileRouter = require('./routes/profile-router');

const app = express();

mongoose.connect(keys.mongodb.dbURI, () => {
  console.log(`Connected to mongo database...`);
});

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('short'));
app.use(bodyParser.urlencoded({ exteded: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  maxAge: 24 * 3600000,
  keys: [keys.cookie.secret]
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  console.log(`CURRENT USER: ${req.user}`);
  app.locals.user = req.user;
  next();
});
app.use('/auth', authRouter);
app.use('/profile', profileRouter);

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(app.get('port'), () => {
  console.log(`Server started listening on port ${app.get('port')}...`);
});
