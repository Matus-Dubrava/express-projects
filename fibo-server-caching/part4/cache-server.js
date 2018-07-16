const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

const keys = require('./config/keys');
const Fibo = require('./models/fibcache-model');

const cache = new Map();
const app = express();

mongoose.connect(keys.mongodb.dbURI, () => {
  console.log(`Connection to database established...`);
});

app.set('port', process.env.CACHEPORT || 3002);

app.use(logger('dev'));

// if cache is empty, populate it with database entries
app.use((req, res, next) => {
  if (cache.size === 0) {
    Fibo.find({})
      .then((entries) => {
        entries.forEach((entry) => {
          cache.set(entry.fiboinp, entry.fibores);
        });
        next();
      });
  } else {
    next();
  }
});

app.get('/fibonacci/:fiboinp', (req, res) => {
  res.json({
    fiboinp: req.params.fiboinp,
    fibores: cache.get(req.params.fiboinp)
  });
});

app.get('/fibonacci/update/:fiboinp/:fibores', (req, res, next) => {
  cache.set(req.params.fiboinp, req.params.fibores);

  const fibo = new Fibo({
    fiboinp: req.params.fiboinp,
    fibores: req.params.fibores
  });

  // save entry in database and continue
  fibo.save().then(() => next());
});

app.listen(app.get('port'), () => {
  console.log(`Server started listening on port ${app.get('port')}...`);
});
