var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const hbs = require('express-handlebars');
var app = express();

// view engine setup
app.engine('hbs', hbs({
  extname: 'hbs', 
  defaultLayout: 'layout', 
  layoutDir: __dirname + '/views/layouts',
  partialsDir  : [
        //  path to your partials
        __dirname + '/views/partials',
    ]
  }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js',express.static(path.join(__dirname, 'public/js')));
app.use('/css',express.static(path.join(__dirname, 'public/css')));
app.use('/vdo',express.static(path.join(__dirname, 'public/vdo')));
app.use('/img',express.static(path.join(__dirname, 'public/img')));
//DAshboard
app.use('/dashboard/js',express.static(path.join(__dirname, 'public/dashboard/js')));
app.use('/dashboard/css',express.static(path.join(__dirname, 'public/dashboard/css')));
app.use('/dashboard/vdo',express.static(path.join(__dirname, 'public/dashboard/vdo')));
app.use('/dashboard/img',express.static(path.join(__dirname, 'public/dashboard/img')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
