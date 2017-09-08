var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
const config = require('./database');

mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
    console.log('**** MONGOOSE CONNECTED to ' +config.database + ' ****')    
});

mongoose.connection.on('error', (err) => {
    console.log('Database Error: ' +err)
})

var models_path = path.join(__dirname, './../models');

fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') >= 0) {

    require(models_path + '/' + file);
    
  }
});