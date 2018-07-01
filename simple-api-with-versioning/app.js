const express = require('express');
const logger = require('morgan');

const routerV1 = require('./routes/routesV1.js');
const routerV2 = require('./routes/routesV2.js');

const app = express();

app.set('port', process.env.PORT || 4000);

app.use(logger('short'));

app.use('/apis/v1/random', routerV1);
app.use('/apis/v2/random', routerV2);

app.use((req, res, next) => {
  res.send(`please visit correst api url using /apis/v1/random or /apis/v2/random`);
});

app.listen(app.get('port'), () => {
  console.log(`Server started on port ${app.get('port')}...`);
});
