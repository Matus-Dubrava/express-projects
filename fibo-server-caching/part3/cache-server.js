const express = require('express');
const logger = require('morgan');

const cache = new Map();

const app = express();

app.set('port', process.env.CACHEPORT || 3002);

app.use(logger('dev'));

app.get('/fibonacci/:fiboinp', (req, res) => {
  res.json({
    fiboinp: req.params.fiboinp,
    fibores: cache.get(req.params.fiboinp)
  });
});

app.get('/fibonacci/update/:fiboinp/:fibores', (req, res, next) => {
  cache.set(req.params.fiboinp, req.params.fibores);
  next();
});

app.listen(app.get('port'), () => {
  console.log(`Server started listening on port ${app.get('port')}...`);
});
