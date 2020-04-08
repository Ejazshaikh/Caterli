const mongoose = require('mongoose');

module.exports = function () {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose
    .connect('mongodb://localhost/caterli-db', options)
    .then(() => console.log('DB Connected'));
};
