var express = require('express');
var router = express.Router();
const cartController = require('../controller/cartcontroller');

// Mostrar el carrito
router.get('/cart/productCart', cartController.showCart);

// Añadir un producto al carrito
router.post('/cart/add', cartController.addToCart);

// Actualizar cantidad de un producto en el carrito
router.post('/cart/update', cartController.updateCart);

// Eliminar un producto del carrito
router.post('/cart/remove', cartController.removeFromCart);

module.exports = router;
