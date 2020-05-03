const express = require('express');
require('dotenv').config()

const app = express();

require('./startup/prod')(app);
require('./startup/validation')();
require('./startup/config')(app);
require('./startup/db')();
require('./startup/routes')(app);

module.exports = app;
