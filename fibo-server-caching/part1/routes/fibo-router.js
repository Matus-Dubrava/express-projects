const router = require('express').Router();

const utils = require('../utils/fibo');

router.get('/', (req, res) => {
  if (req.query.fiboinp) {
    const fibores = utils.fibonacci(Math.floor(req.query.fiboinp));

    res.render('fibonacci', {
      title: 'Calculate fibonacci number',
      fiboinp: req.query.fiboinp,
      fibores
    });

  } else {
    res.render('fibonacci', {
      title: 'Calculate fibonacci number',
      fiboinp: undefined
    });
  }
});

module.exports = router;
