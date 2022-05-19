var express = require('express');
//const { UPSERT } = require('sequelize/types/query-types');
var router = express.Router();
const user = require('../controller/users.js');

/* GET users listing. */
router.post('/new_user', function(req, res){
  user.new_user(req, res)
});

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
