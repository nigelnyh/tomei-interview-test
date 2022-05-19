var express = require('express');
var router = express.Router();
const db = require('../model/db.js');
const Op = db.Sequelize.Op;
const sq = db.sequelize;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
