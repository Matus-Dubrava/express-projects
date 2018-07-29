const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Welcome to App',
    messages: req.flash('info'),
    errors: req.flash('error'),
    authUser: req.user
  });
});

module.exports = router;
