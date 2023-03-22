const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

// Koneksi ke database MongoDB
mongoose.connect(
  'mongodb://localhost:27017/nuxt_solutions',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database Terhubung !!');
});

module.exports = mongoose