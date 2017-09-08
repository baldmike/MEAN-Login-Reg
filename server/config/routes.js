const users = require('../controllers/users.js');
const path = require('path');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

module.exports = function(app) {

app.get('/', (req, res) => {
    res.send('INDEX ROUTE ACTIVE');
})

// Register
app.post('/api/users/register', (req, res, next) => {
    console.log('USER API CREATE');
    users.addUser(req, res);
});

// Authenticate
app.post('/api/users/authenticate', (req, res, next) => {
    console.log('AUTHENTICATE ROUTE');
    users.authenticater(req, res);
});

// Profile  ---  CHECK JWT IN PASSPORT.JS!!!!  THIS MIGHT NOT WORK.... 
app.get('/api/users/profile', passport.authenticate('jwt', { session : false }),(req, res, next) => {
    console.log('profile route hit');
    res.json({ user: req.user });
});

app.get('*', function(req, res) {
    res.sendFile(path.resolve('./public/dist/index.html'))
  })
};