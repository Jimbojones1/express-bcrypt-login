var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  if(req.session.isLoggedIn){
      res.render('music', {username: req.session.username})
  }
  else{
    res.redirect('/user/login')
  }

})






module.exports = router;
