var express = require('express');
var router = express.Router();
const Joi = require('joi');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '  lami1a organisation  for  Intelligent habit', index: true });
});


router.get('/about', function(req, res, next) {
  res.render('about', { title: 'lami1a organisation / les premiers 100 ' ,index: true});
});

router.get('/li', function(req, res, next) {
  res.render('li', { title: 'li ', dash: true });
});

module.exports = router;
