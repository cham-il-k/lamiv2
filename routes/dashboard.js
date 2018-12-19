const express = require('express');
const router = express.Router();

// get dashboard 
router.get('/', (req, res) => {
    res.render('dashboard',{title: 'dashbord li', dash: true});
});
router.get('/li', function(req, res, next) {
    res.render('li', { title: 'li ', dash: true });
  });
module.exports = router;