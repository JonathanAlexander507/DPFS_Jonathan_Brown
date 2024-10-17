var express = require('express');
var router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const cartController = require('../controller/cartcontroller')

// Mostrar el carrito
router.get('/cart/productCart', isLoggedIn, cartController.showCart);

// Añadir un producto al carrito
router.post('/cart/add', isLoggedIn, cartController.addToCart);

// Actualizar cantidad de un producto en el carrito
router.post('/cart/update', isLoggedIn, cartController.updateCart);

// Eliminar un producto del carrito
router.post('/cart/remove', isLoggedIn, cartController.removeFromCart);

module.exports = router;
