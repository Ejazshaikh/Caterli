module.exports = function(err, req, res, next) {
  console.log('yaya error', err);
  res.status(err.status || 500).send('error');
}