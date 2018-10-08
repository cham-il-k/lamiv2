const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
  mongoose.connect('mongodb://localhost:27017/lamia1-land')
    .then(() => winston.info('Connected to MongoDB...'));
}