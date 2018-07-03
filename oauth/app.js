const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

const authRoutes = require('./routes/auth-routes');
const profileRouter = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const keys = require('./config/keys');

const app = express();

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
  console.log(`connect to mongodb`);
});

// set up view engine - we will be using ejs
app.set('view engine', 'ejs');

// set up cookie
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// use routers
app.use('/auth', authRoutes);
app.use('/profile', profileRouter);

// create home route
app.get('/', (req, res) => {
  console.log(req.user);
  res.render('index');
});

app.listen(4000, () => {
  console.log(`app now listening for requests on port 4000`);
});
