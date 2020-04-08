const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const orderRouter = require('./routes/orders');
const restaurantRouter = require('./routes/restaurants');
const errorMiddleware = require('./middlewares/error');

const app = express();

if (!process.env.caterli_jwtPrivateKey) {
  console.error('ERROR: caterli_jwtPrivateKey is not defined in Environment Variables');
  process.exit(1);
}

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect('mongodb://localhost/caterli-db', options).then(() => console.log('DB Connected'));

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/restaurants', restaurantRouter);
app.use('/api/order', orderRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(errorMiddleware);

module.exports = app;
