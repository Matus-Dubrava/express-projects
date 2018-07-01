const express = require('express');

const randomRouter = require('./routes.js');

const app = express();
app.set('port', process.env.PORT || 4000);

// If user visits '/' url then the message pointing her to
// our API is send back to browser
app.get('/', (req, res) => {
  res.send(`visit /random/ to reach random API`);
});

// Here we are giving /random prefix for our API router
app.use('/random', randomRouter);

// If the requested url is not one of the above, send 404 status
// back to browser.
app.use((req, res, next) => {
  res.status(404).send('404 Error! Page not found.')
});

app.listen(app.get('port'));
