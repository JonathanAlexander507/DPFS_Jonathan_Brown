var express = require('express');
var router = express.Router();
let detailsController = require('../controller/detailscontroller');

// Ruta para editar un producto por ID (esto debe ser correcto)
router.get('/products/productEdit/:id?', detailsController.edit); // ID opcional aquí

// Ruta para guardar un producto (agregar o editar)
router.post('/productos/save', detailsController.save);

// Ruta para eliminar un producto
router.post('/productos/delete/:id', detailsController.delete);

// Ruta para cargar la página de agregar productos
router.get('/products/productLoad', detailsController.load);

// Ruta para cargar la página de agregar productos
router.get('/products/productDetail/:id', detailsController.details);

module.exports = router;
