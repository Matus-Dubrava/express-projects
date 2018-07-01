const express = require('express');
const path = require('path');
const logger = require('morgan');

const router = require('./routes.js');
const app = express();

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('short'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/apis/random', router);

app.get('/', (req, res) => {
  res.render('index');
});

app.use((req, res, next) => {
  res.render('404');
});

app.listen(app.get('port'), () => {
  console.log(`Server started on port ${app.get('port')}...`);
});
