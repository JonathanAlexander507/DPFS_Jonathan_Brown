var express = require('express');
var router = express.Router();
let controller = require('../controller/cartcontroller')

/* GET home page. */
router.get('/cart/productCart', controller.cart);


module.exports = router;