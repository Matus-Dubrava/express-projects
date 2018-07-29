const express = require('express');
const path = require('path');
const logger = require('morgan');
const log = require('debug')('app:app');
const error = require('debug')('app:error');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');

const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieSession({
  maxAge: 24 * 3600000,
  keys: [keys.cookie.secret]
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', require('./routes/index-router'));
app.use('/users', require('./routes/user-router').router);

app.use((req, res, next) => {
  res.status(404).render('error', {
    title: '404 Page not found',
    messages: req.flash('info'),
    errors: req.flash('error'),
    authUser: req.user
  });
});

app.use((err, req, res, next) => {
  res.status(500).render('error', {
    title: `500 Error! ${err}`,
    messages: req.flash('info'),
    errors: req.flash('error'),
    authUser: req.user
  });
});

app.listen(app.get('port'), () => {
  log(`Server started listening on port ${app.get('port')}.`);
});
