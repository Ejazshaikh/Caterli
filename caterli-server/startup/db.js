const mongoose = require('mongoose');

module.exports = function () {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose.connect(process.env.caterli_db, options).then(() => console.log('DB Connected'));
};
