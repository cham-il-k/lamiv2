require('express-async-errors');
const winston = require('winston');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const dashboardRouter = require('./routes/dashboard');
const tabletRouter = require('./routes/tablet');
const authRouter = require('./routes/auth');
const genreRouter = require('./routes/genres');
const  hbs = require('express-handlebars');
const app = express();
const helmet = require('helmet');
const config =  require('config');
const debug = require('debug')('app:startup');
const mongoose = require('mongoose');
var dbConnection = mongoose.connect('mongodb://localhost:27017/users')
    .then(() => console.log('connected to database'))
    .catch((err) => console.log(`can t connect to database for  ${err}`));
// view engine setup
winston.add(new winston.transports.File({ filename: 'logfile.log'}));
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
app.set("name", config.get('name'));

if(app.get('env') === 'development') {
console.log(app.get('env')); 
app.use(logger('dev'));
  debug('development debug starts');
} 
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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


app.use('/users', usersRouter);
app.use('/dashboard', dashboardRouter);
app.use('/auth', authRouter);
app.use('/tablet', tabletRouter);
app.use('/genre', genreRouter);
app.use('/', indexRouter);

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
