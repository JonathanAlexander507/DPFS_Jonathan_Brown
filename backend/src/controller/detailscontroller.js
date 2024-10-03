const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
let productos = require('../../database/productos.json');
const upload = require('../middleware/multerConfig'); // Importa la configuración de multer

let details = {
    // Mostrar la página de edición/agregar producto
    edit: (req, res) => {
        let productId = req.params.id;
        let product = productos.find(p => p.id == productId);
        return res.render("products/productEdit", {
            title: "Editar o Agregar Producto",
            product: product,
            errors: [] // Inicializar el array de errores
        });
    },

    save: (req, res) => {
        const errors = validationResult(req);

        // Si hay errores de validación, devolverlos a la vista
        if (!errors.isEmpty()) {
            let productId = req.body.id;
            let product = productos.find(p => p.id == productId);
            return res.render("products/productEdit", {
                title: productId ? "Editar Producto" : "Agregar Producto",
                product: req.body, // Retorna los valores ingresados para que no se pierdan
                errors: errors.array() // Pasar los errores a la vista
            });
        }

        let productId = req.body.id;
    
        // Obtener las imágenes subidas de cada campo
        const imageFiles = req.files.image ? req.files.image[0].filename : ''; // Obtener la imagen principal
        const image1Files = req.files.image1 ? req.files.image1[0].filename : '';
        const image2Files = req.files.image2 ? req.files.image2[0].filename : '';
        const image3Files = req.files.image3 ? req.files.image3[0].filename : '';
        const image4Files = req.files.image4 ? req.files.image4[0].filename : '';
    
        if (productId) {
            // Editar producto existente
            let productIndex = productos.findIndex(p => p.id == productId);
            if (productIndex != -1) {
                productos[productIndex] = {
                    id: productId,
                    name: req.body.name,
                    category: req.body.category,
                    brand: req.body.brand,
                    model: req.body.model,
                    specs1: req.body.specs1,
                    specs2: req.body.specs2,
                    specs3: req.body.specs3,
                    price: parseFloat(req.body.price),
                    stock: parseInt(req.body.stock) || 100,
                    description: req.body.description,
                    description2: req.body.description2,
                    image: imageFiles || productos[productIndex].image, // Mantener la imagen existente si no se subió una nueva
                    image1: image1Files || productos[productIndex].image1 || '',
                    image2: image2Files || productos[productIndex].image2 || '',
                    image3: image3Files || productos[productIndex].image3 || '',
                    image4: image4Files || productos[productIndex].image4 || ''
                };
            }
        } else {
            // Agregar nuevo producto
            let newProduct = {
                id: productos.length + 1,
                name: req.body.name,
                category: req.body.category,
                brand: req.body.brand,
                model: req.body.model,
                specs1: req.body.specs1,
                specs2: req.body.specs2,
                specs3: req.body.specs3,
                price: parseFloat(req.body.price),
                stock: parseInt(req.body.stock) || 100,
                description: req.body.description,
                description2: req.body.description2,
                image: imageFiles || '', // La imagen principal
                image1: image1Files || '',
                image2: image2Files || '',
                image3: image3Files || '',
                image4: image4Files || ''
            };
            productos.push(newProduct);
        }
    
        // Guardar cambios en el archivo JSON
        fs.writeFileSync('./database/productos.json', JSON.stringify(productos, null, 2));
        return res.redirect('/'); // Redirigir a la página principal
    },

    // Eliminar producto
    delete: (req, res) => {
        let productId = req.params.id;
        productos = productos.filter(p => p.id != productId);

        // Guardar cambios en el archivo JSON
        fs.writeFileSync('./database/productos.json', JSON.stringify(productos, null, 2));
        return res.redirect('/');
    },

    // Cargar la página de agregar productos
    load: (req, res) => {
        return res.render("products/productLoad", {
            title: "Agregar Productos",
            errors: [] // Inicializar el array de errores
        });
    },

    // Mostrar lista de todos los productos
    list: (req, res) => {
        return res.render("products/productList", {
            title: "Lista de Productos",
            productos: productos // Pasar todos los productos a la vista
        });
    },

    // Mostrar detalles de un producto
    details: (req, res) => {
        let productId = req.params.id;
        let product = productos.find(p => p.id == productId);

        // Verifica si el producto existe
        if (!product) {
            return res.status(404).send("Producto no encontrado");
        }

        return res.render("products/productDetail", {
            title: "Detalle de producto",
            product: product
        });
    },
};

module.exports = details;
