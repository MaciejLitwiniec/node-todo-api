var mongoose = require('mongoose');

//to 'inform' mongoose that we will use JS built-in Promise
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports = {mongoose};
