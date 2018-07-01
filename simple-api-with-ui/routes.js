const express = require('express');

const random = require('./random');

const router = express.Router();

router.get(/^\/(\d+)-(\d+)\/?$/, (req, res) => {
  const min = Number(req.params[0]),
        max = Number(req.params[1]),
        result = random.getRandom(min, max);

  res.json({
    result
  });
});

module.exports = router;
