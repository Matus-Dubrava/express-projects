const router = require('express').Router();
const http = require('http');

router.get('/', (req, res, next) => {
  if (req.query.compval) {

    // create new request to the server performing the computation
    const compReq = http.request({
      port: process.env.COMPSERVPORT || 3001,
      host: 'localhost',
      method: 'get',
      path: `/${req.query.compval}`
    }, (compRes) => {
      compRes.on('data', (data) => {
        res.render('compute', {
          title: 'Perform computation',
          compval: req.query.compval,
          compres: JSON.parse(data).result
        });
      });
      compRes.on('error', (err) => next(err));
    });

    compReq.on('error', (err) => next(err));
    compReq.end();

  } else {
    res.render('compute', {
      title: 'Perform computation',
      compval: undefined
    });
  }
});

module.exports = router;
