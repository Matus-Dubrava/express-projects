const express = require('express');

const random = require('../random.js');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('welcome to random API v1, usage ""../number/number" where number is integer');
});

router.get(/^\/(\d+)\/(\d+)\/?$/, (req, res) => {
  const min = Number(req.params[0]),
        max = Number(req.params[1]),
        result = random.getRandom(min, max);

  res.json({ result });
});

module.exports = router;
