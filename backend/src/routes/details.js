var express = require('express');
var router = express.Router();
let controller = require('../controller/detailscontroller')


/* GET home page. */
router.get('/products/productDetail', controller.details);
router.get('/products/productEdit', controller.edit);
router.get('/products/productLoad', controller.load);
// Ruta para mostrar los detalles de un producto
router.get('/productos/:id', controller.details);

// Ruta para mostrar el formulario de edición/agregar producto
router.get('/productos/edit/:id?', detailsController.edit);

// Ruta para guardar producto (agregar o editar)
router.post('/productos/save', detailsController.save);

// Ruta para eliminar producto
router.post('/productos/delete/:id', detailsController.delete);

module.exports = router;