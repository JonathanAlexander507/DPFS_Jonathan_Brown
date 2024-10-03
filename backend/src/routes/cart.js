var express = require('express');
var router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const cartController = require('../controller/cartController')

/* GET home page. */
router.get('/cart/productCart', isLoggedIn, cartController.showCart);


module.exports = router;