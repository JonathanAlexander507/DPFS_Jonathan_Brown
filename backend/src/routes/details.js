var express = require('express');
var router = express.Router();
let detailsController = require('../controller/detailscontroller');  // Aseguramos el nombre correcto

/* Rutas para productos */

// Mostrar los detalles de un producto específico
router.get('/products/productDetail/:id', detailsController.details);

// Página de agregar o editar producto (si hay ID, es para editar; si no, para agregar)
router.get('/products/productEdit/:id?', detailsController.edit);

// Página para cargar productos (si es diferente del editor)
router.get('/products/productLoad', detailsController.load);

// Guardar producto (agregar o editar)
router.post('/productos/save', detailsController.save);

// Eliminar producto
router.post('/productos/delete/:id', detailsController.delete);

module.exports = router;