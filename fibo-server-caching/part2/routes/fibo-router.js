const router = require('express').Router();
const http = require('http');

const utils = require('../utils/fibo');

router.get('/', (req, res, next) => {
  if (req.query.fiboinp) {

    const fiboReq = http.request({
      host: 'localhost',
      port: process.env.FIBOPORT || 3001,
      method: 'get',
      path: `/fibonacci/${req.query.fiboinp}`
    }, (fiboRes) => {
      fiboRes.on('data', (data) => {
        data = JSON.parse(data);
        res.render('fibonacci', {
          title: 'Calculate fibonacci number',
          fiboinp: req.query.fiboinp,
          fibores: data.fibores
        });
      });
      fiboRes.on('error', (err) => next(err));
    });

    fiboReq.on('error', (err) => next(err));
    fiboReq.end();

  } else {
    res.render('fibonacci', {
      title: 'Calculate fibonacci number',
      fiboinp: undefined
    });
  }
});

module.exports = router;
