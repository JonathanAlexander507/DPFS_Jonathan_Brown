var express = require('express');
var router = express.Router();
let controller = require('../controller/indexcontroller');
const cartController = require('../controller/cartcontroller');

/* GET home page */
router.get('/', controller.index);

/* Carrito de compras */
router.get('/cart/productCart', cartController.showCart); // Mostrar el carrito
router.post('/cart/addToCart', cartController.addToCart); // Añadir producto al carrito

module.exports = router;
