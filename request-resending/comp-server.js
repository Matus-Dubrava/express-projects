const express = require('express');
const utils = require('./utils/utils');
const logger = require('morgan');

const app = express();

app.set('port', process.env.COMPSERVPORT || 3001);

app.use(logger('dev'));

app.get('/:num', (req, res) => {
  const result = utils.compute(Math.floor(req.params.num));

  res.json({
    input: req.params.num,
    result
  });
});

app.listen(app.get('port'), () => {
  console.log(`Computation server started listening on port ${app.get('port')}...`);
});
