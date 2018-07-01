const express = require('express');
const path = require('path');
const logger = require('morgan');
const fs = require('fs');

const app = express();

app.set('port', process.env.PORT || 4000);

app.use(logger('short'));

// middleware handling logging requests into a log file
app.use((req, res, next) => {
  const data = `request : ${req.url} : ${req.method} : ${new Date()} \n`;

  fs.appendFile('requests.log', data, err => {
    if (err) { console.log(err) }
  });

  next();
});

app.use((req, res, next) => {
  res.send(`request : ${req.url} : ${req.method} : ${new Date()}`);
});

app.listen(app.get('port'), () => {
  console.log(`Server started on port ${app.get('port')}`);
});
