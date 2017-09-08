var mongoose = require('mongoose');
var User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const config = require('../config/database')
const jwt = require('jsonwebtoken');

module.exports = {

    addUser: (req, res) => {
        console.log("**** ADD USER: " +req.body.name);
        
        var newUser = new User ({

            name : req.body.name,
            email : req.body.email,
            password : req.body.password
    
        });
    

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save(function(err) {
                    if (err) {
                        console.log(err);
                        res.json({success: false, msg: "Failed to Register User"});
                    } else {
                        res.json({success: true, msg: "User Registered"});
                    }
                });
            });
        });
    },

    authenticater: (req, res) => {
        const email = req.body.email;
        const password = req.body.password;

        User.getUserByEmail(email, (err, user) => {
            if(err) throw err;
            if(!user){
                return res.json({success: false, msg: 'User Not Found'});
            }

            User.comparePassword(password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch) {
                    const token = jwt.sign(user, config.secret,  {
                        expiresIn: 86400 // 1 Day

                    });

                    res.json ({
                        success: true,
                        token: 'JWT ' + token,
                        user: {
                        id: user._id,
                        name: user.name,
                        email: user.email
                        }
                    });
                } else {
                    return res.json({success : false, msg : 'Incorrect Password'});
                }
            })
            
        })
    },

    comparePassword: function(candidatePassword, hash, callback) {
        bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
            if(err) throw err;
            callback(null, isMatch);
        });
    }

};
