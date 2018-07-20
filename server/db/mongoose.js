var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://admin:admin1@ds141611.mlab.com:41611/still-peak-61965-todo" || 'mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};