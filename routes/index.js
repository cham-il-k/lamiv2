var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'laMi1A Company Intelligent habit', index: true });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express' ,index: false});
});
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', { title: 'Omia 1 2 3 ', index: false });
});
module.exports = router;
