const createError = require('http-errors');
const indexRouter = require('../routes/index');
const usersRouter = require('../routes/users');
const authRouter = require('../routes/auth');
const orderRouter = require('../routes/orders');
const errorMiddleware = require('../middlewares/error');
const restaurantRouter = require('../routes/restaurants');

module.exports = function (app) {
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
};
