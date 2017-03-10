var mongoose = require('mongoose');

// mongo automatically creates the database
var connectionString = 'mongodb://localhost/animalSpirits';
console.log(connectionString)

mongoose.connect(connectionString);

mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to: ' + connectionString);
});
mongoose.connection.on('error', function(error) {
  console.log('Mongoose error! ' + error);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected from: ' + connectionString);
});


// no need to export the db file
