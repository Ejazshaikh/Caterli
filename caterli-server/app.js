const express = require('express');

const app = express();

require('./startup/validation')();
require('./startup/config')(app);
require('./startup/db')();
require('./startup/routes')(app);

module.exports = app;
