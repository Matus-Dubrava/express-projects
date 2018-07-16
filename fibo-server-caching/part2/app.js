const express = require('express');
const logger = require('morgan');
const path = require('path');

const fiboRouter = require('./routes/fibo-router');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));

app.use('/fibonacci', fiboRouter);

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Fibonacci app'
  });
});

app.listen(app.get('port'), () => {
  console.log(`Server started listening on port ${app.get('port')}...`);
});
