const express = require('express');
const logger = require('morgan');
const http = require('http');

const utils = require('./utils/fibo');

const app = express();

app.set('port', process.env.FIBOPORT || 3001);

app.use(logger('dev'));

app.get('/fibonacci/:fiboinp', (req, res, next) => {
  const fibores = utils.fibonacci(Math.floor(req.params.fiboinp));

  const cacheReq = http.request({
    host: 'localhost',
    port: process.env.CACHEPORT || 3002,
    method: 'get',
    path: `/fibonacci/update/${req.params.fiboinp}/${fibores}`
  }, (cacheRes) => {
    
  });
  cacheReq.on('error', (err) => next(err));
  cacheReq.end();

  res.json({
    fiboinp: req.params.fiboinp,
    fibores
  });
});

app.listen(app.get('port'), () => {
  console.log(`Server started listening on port ${app.get('port')}...`);
});
