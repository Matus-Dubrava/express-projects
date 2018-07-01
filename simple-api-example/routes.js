const express = require('express');

const random = require('./random.js');

// Create a router object
const router = express.Router();

// If user types url such as /random/10-20 or any numbers
// that are matched by regular expression then this function
// will be run.

// We obtain the provided numbers from req.params object where,
// each entry corresponds to one group in our regular expression.
// Note that the obtained values are strings, not numbers, therefore
// we need to convert them before passing them to random function
// so that it works correctly.

// Lastly we just send a json string containing the selected range
// and the generated random integer back to browser.
router.get(/^\/(\d+)-(\d+)/, (req, res) => {
  const min = Number(req.params[0]),
        max = Number(req.params[1]),
        num = random.getRandom(min, max);

  res.json({
    range: `${min} - ${max}`,
    result: num
  });
});

module.exports = router;
