var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
require('./routes/passport')(passport);

var routes = require('./routes/index');
var users = require('./routes/users');
var home = require('./routes/home');
var mongoSessionURL = "mongodb://localhost:27017/login";
var expressSessions = require("express-session");
var mongoStore = require("connect-mongo/es5")(expressSessions);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSessions({
  secret: "litmus_passport",
  resave: false,
  saveUninitialized: false,
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 6 * 1000,
  store: new mongoStore({
    url: mongoSessionURL
  })
}));
app.use(passport.initialize());

app.use('/users', users);
app.get('/', home.signin);
app.use('/users', users);
app.get('/signIn',home.signin);
app.get('/dashboard',routes);
app.get('/getData',home.generateData);

app.get('/logout', function(req,res) {
  req.session.destroy();
  res.redirect('/');
});

app.post('/login', function(req, res, next) {
	
  passport.authenticate('login', function(err, user, info) {
    if(err) {
      return next(err);
    }

    if(!user) {
      return res.redirect('/');
    }

    req.logIn(user, {session:false}, function(err) {
      if(err) {
        return next(err);
      }
      req.session.user = req.body.username;
      console.log("session initilized");
      return res.render('index');
    });
  })(req, res, next);
});

app.post('/login', isAuthenticated, function(req, res) {
	console.log("session: "+req.session.user);
  res.render('index', {user:{username: req.session.user}});
});

function isAuthenticated(req, res, next) {
  if(req.session.user) {
     console.log(req.session.user);
     return next();
  }

  res.redirect('/');
};

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;