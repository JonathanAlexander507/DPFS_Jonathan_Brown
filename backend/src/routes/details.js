var express = require('express');
var router = express.Router();
let detailsController = require('../controller/detailscontroller'); // Asegúrate de que esta ruta sea correcta

// Ruta para editar un producto por ID
router.get('/products/productEdit/:id?', detailsController.edit); // ID opcional aquí

// Ruta para guardar un producto (agregar o editar)
router.post('/productos/save', detailsController.save);

// Ruta para eliminar un producto
router.post('/productos/delete/:id', detailsController.delete);

// Ruta para cargar la página de agregar productos
router.get('/products/productLoad', detailsController.load); // Asegúrate de que esta línea esté presente

// Ruta para cargar la página de detalles de un producto
router.get('/products/productDetail/:id', detailsController.details);

router.get("/products/productList", detailsController.list);

module.exports = router;
