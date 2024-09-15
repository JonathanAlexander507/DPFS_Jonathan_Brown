var express = require('express');
var router = express.Router();
let controller = require('../controller/indexcontroller')

/* GET home page. */
router.get('/productDetail', controller.details);


module.exports = router;