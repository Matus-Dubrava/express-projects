const mongoose = require('mongoose');

const cacheSchema = new mongoose.Schema({
  fiboinp: String,
  fibores: String
});

const Fibo = mongoose.model('fibo', cacheSchema);

module.exports = Fibo;
