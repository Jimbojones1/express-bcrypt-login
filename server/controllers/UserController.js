var express = require('express');
var router = express.Router();
var User   = require('../models/UserModel');
var bcrypt = require('bcryptjs');

router.get('/login', function(req, res, next){
  console.log(req.session)
  res.render('login', {})
})

router.post('/login', function(req, res, next){

  /// first query the database and find the user
  User.findOne({username: req.body.username}, function(err, user){
    //if there is a user then unhash their password
    if(user){

      bcrypt.compare(req.body.password, user.password, function(err, match){
        // this function returns true or false
        if(match === true){
          // set the session and direct to whereever
            req.session.username = user.username;
            req.session.userId   = user.id;
            req.session.isLoggedIn = true;


            res.redirect('/music')

        }
        else{
          // send them a message wrong username or password
          res.render('login', {message: 'username or password was wrong'})
        }


      })


    }
    else {
      res.render('login', {message: 'username or password was wrong'})
    }



  })











})

router.post('/register', function(req, res, next){
  // checking the database to see if there is already a username,
  // that matches req.body.username
  User.findOne({username: req.body.username}, function(err, user){
    console.log(user, ' this is user from database')
    if(user === null){
      // I want to register them
      //1. Salt and Hash the user password
      bcrypt.genSalt(10, function(err, salt){
        // now that we've created a salt lets create a hash now
        bcrypt.hash(req.body.password, salt, function(err, hash){
            // now that we created a hash now we can finally save the user in the db
            // make an object with the correct information to put in the db
            var userDbEntry = {};
            userDbEntry.username = req.body.username;
            userDbEntry.password = hash;

            // now we can use our model to create an entry in the db
            User.create(userDbEntry, function(err, user){
              if(user){
                // if user was created, iniate there session
                req.session.username = user.username;
                req.session.userId   = user.id;
                req.session.isLoggedIn = true;

                // redirect to the home page
                res.send('you are logged in ')
              }
              else {
                res.send('there was an error')
              }
            })
        })
      })
    }
    else{
      // I want to send a message username already taken
      res.render('register', {message: 'username is taken'})
    }
  })
})

router.get('/register', function(req, res, next){


  res.render('register', {})
})


router.get('/logout', function(req, res){
  req.session.destroy(function(err){
    res.redirect('/user/login')
  })
})





// export the controller
module.exports = router;
