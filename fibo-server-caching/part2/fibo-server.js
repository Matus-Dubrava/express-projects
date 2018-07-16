const express = require('express');
const logger = require('morgan');

const utils = require('./utils/fibo');

const app = express();

app.set('port', process.env.FIBOPORT || 3001);

app.use(logger('dev'));

app.get('/fibonacci/:fiboinp', (req, res) => {
  const fibores = utils.fibonacci(Math.floor(req.params.fiboinp));

  res.json({
    fiboinp: req.params.fiboinp,
    fibores
  });
});

app.listen(app.get('port'), () => {
  console.log(`Server started listening on port ${app.get('port')}...`);
});
