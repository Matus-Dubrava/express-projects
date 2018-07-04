const express = require('express');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const userAgent = req.headers['user-agent'] || 'none';
  if (req.accepts('html')) {
    res.render('index', { userAgent });
  } else {
    res.type('text');
    res.send(req.headers['user-agent']);
  }
});

app.listen(app.get('port'), () => {
  console.log('App started on port' + app.get('port'));
});

module.exports = app;
