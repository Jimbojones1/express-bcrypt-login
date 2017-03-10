var express    = require('express'),
    app        = express(),
    server     = require('http').createServer(app),
    path       = require('path'),
    session    = require('express-session'),
    bodyParser = require('body-parser');



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs')

app.use(session({
  secret: " this is our secret salt",
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false}
}))




app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Requiring Database
require('./db/db');


// require controllers
var UserController = require('./controllers/UserController');
var MusicController = require('./controllers/MusicController');
// set up routes use the controller
app.use('/user', UserController);
app.use('/music', MusicController);


server.listen(3000, function(){
  console.log('Server is listening on port 3000')
})
