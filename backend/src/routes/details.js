var express = require('express');
var router = express.Router();
let detailsController = require('../controller/detailscontroller'); // Asegúrate de que esta ruta sea correcta
const upload = require('../middleware/multerConfig'); // Importa la configuración de multer
const { check, validationResult } = require('express-validator');
const Product = require('../../database/models/Product');


// Ruta para mostrar la lista de productos
router.get('/products/productList', detailsController.list); // Esta línea debe estar presente

// Ruta para devolver los productos como JSON para la API
router.get('/products', detailsController.listJson);

// Ruta para editar un producto por ID
router.get('/products/productEdit/:id?', detailsController.edit);

// Ruta para cargar la página de agregar productos
router.get('/products/productLoad', detailsController.load);

// Ruta para guardar un producto (agregar o editar)
router.post('/productos/save', 
    upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 },
        { name: 'image4', maxCount: 1 }
    ]),
    [
        check('name')
            .isLength({ min: 5 }).withMessage('El nombre del producto debe tener al menos 5 caracteres'),
        check('description')
            .isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres')
    ], 
    detailsController.save
);

// Ruta para eliminar un producto
router.post('/productos/delete/:id', detailsController.delete);

// Ruta para cargar la página de detalles de un producto
router.get('/products/productDetail/:id', detailsController.details);

// Ruta para mostrar productos por categoría
router.get('/products/category/:category', detailsController.showByCategory);

router.get('/search-suggestions', detailsController.searchSuggestions);

// Ruta para buscar productos
router.get('/products/search', detailsController.searchResults);


// Ruta para devolver el conteo de productos y conteos por categoría
router.get('/products/counts', detailsController.getProductCounts); // Nueva ruta




module.exports = router;
