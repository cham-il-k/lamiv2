require('express-async-errors');
const winston = require('winston');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');

const  hbs = require('express-handlebars');
const app = express();
const helmet = require('helmet');
const config =  require('config');
const mongoose = require('mongoose');
var dbConnection = mongoose.connect(config.get('mongo.host')+'/lami1a-li', { useNewUrlParser: true } )
    .then(() => console.log('connected to database'))
    .catch((err) => console.log(`can t connect to database for  ${err}`));
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
app.set("name", config.get('name'));

if(app.get('env') === 'development') {
console.log(app.get('env')); 
app.use(logger('dev'));
} 
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js',express.static(path.join(__dirname, 'public/js')));
app.use('/css',express.static(path.join(__dirname, 'public/css')));
app.use('/img',express.static(path.join(__dirname, 'public/img')));
//DAshboard

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
