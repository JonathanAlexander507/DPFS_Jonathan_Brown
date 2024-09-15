var express = require('express');
var router = express.Router();
let controller = require('../controller/detailscontroller')

/* GET home page. */
router.get('/products/productDetail', controller.details);


module.exports = router;