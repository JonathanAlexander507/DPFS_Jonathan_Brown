var express = require('express');
var router = express.Router();
let controller = require('../controller/indexcontroller')
const isLoggedIn = require('../middleware/isLoggedIn');
const cartController = require('../controller/cartcontroller')

/* GET home page. */
router.get('/', controller.index);

router.get('/cart/productCart', isLoggedIn, cartController.showCart);

router.post('/cart/addToCart', isLoggedIn, cartController.addToCart); // Asegúrate de que el usuario esté logueado


module.exports = router;
