const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

const compRouter = require('./routes/comp-router');

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/compute', compRouter);

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Welcome to math app'
  });
});

app.listen(app.get('port'), () => {
  console.log(`Server started listening on port ${app.get('port')}...`);
});
