const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');

const router = require('./routes.js');

const app = express();

mongoose.connect('mongodb://localhost:27017/userdb');

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('short'));
app.use('/', router);

app.use((req, res, next) => {
  res.status(404).render('404');
});

app.listen(app.get('port'), () => {
  console.log(`Server started on port ${app.get('port')}...`);
});
