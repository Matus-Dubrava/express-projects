const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');

const router = require('./routes.js');

const app = express();

mongoose.connect('mongodb://localhost:27017/usersdb');

app.set('port', process.env.PORT || 4000);

app.use(logger('short'));
app.use('/users', router);

app.use((req, res, next) => {
  res.send('404 Error!');
});

app.listen(app.get('port'), () => {
  console.log(`Server started on port ${app.get('port')}...`);
});
