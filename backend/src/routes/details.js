var express = require('express');
var router = express.Router();
let detailsController = require('../controller/detailscontroller'); // Ruta del controlador de detalles
const upload = require('../middleware/multerConfig'); // Middleware para subida de archivos
const { check } = require('express-validator');
const cartController = require('../controller/cartcontroller');

// Ruta para mostrar la lista de productos
router.get('/products/productList', detailsController.list);

// Ruta para devolver los productos como JSON para la API
router.get('/products', detailsController.listJson);

// Ruta para editar un producto por ID
router.get('/products/productEdit/:id?', detailsController.edit);

// Ruta para cargar la página de agregar productos
router.get('/products/productLoad', detailsController.load);

// Ruta para guardar un producto (agregar o editar)
router.post(
    '/productos/save',
    upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 },
        { name: 'image4', maxCount: 1 },
    ]),
    [
        check('name')
            .isLength({ min: 5 })
            .withMessage('El nombre del producto debe tener al menos 5 caracteres'),
        check('description')
            .isLength({ min: 20 })
            .withMessage('La descripción debe tener al menos 20 caracteres'),
    ],
    detailsController.save
);

// Ruta para eliminar un producto
router.post('/productos/delete/:id', detailsController.delete);

// Ruta para cargar la página de detalles de un producto
router.get('/products/productDetail/:id', detailsController.details);

// Ruta para mostrar productos por categoría
router.get('/products/category/:category', detailsController.showByCategory);

// Ruta para buscar productos
router.get('/products/search', detailsController.searchResults);

// Ruta para devolver el conteo de productos y conteos por categoría
router.get('/products/counts', detailsController.getProductCounts);

// Ruta para añadir productos al carrito
router.post('/cart/addToCart', cartController.addToCart);

module.exports = router;
