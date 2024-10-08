const { validationResult } = require('express-validator');
const Product = require('../../database/models/Product');
const { Op } = require('sequelize');

const details = {
    // Mostrar la página de edición/agregar producto
    edit: async (req, res) => {
        const product = await Product.findByPk(req.params.id);
        return res.render("products/productEdit", {
            title: product ? "Editar Producto" : "Agregar Producto",
            product: product || {},
            errors: []
        });
    },

    save: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("products/productEdit", {
                title: req.body.id ? "Editar Producto" : "Agregar Producto",
                product: req.body,
                errors: errors.array()
            });
        }
    
        // Obtener las imágenes subidas
        const imageFiles = req.files.image ? req.files.image[0].filename : '';
        const image1Files = req.files.image1 ? req.files.image1[0].filename : '';
        const image2Files = req.files.image2 ? req.files.image2[0].filename : '';
        const image3Files = req.files.image3 ? req.files.image3[0].filename : '';
        const image4Files = req.files.image4 ? req.files.image4[0].filename : '';
    
        if (req.body.id) {
            // Editar un producto existente
            await Product.update({
                name: req.body.name,
                category: req.body.category,
                brand: req.body.brand,
                model: req.body.model,
                specs1: req.body.specs1,
                specs2: req.body.specs2,
                specs3: req.body.specs3,
                price: parseFloat(req.body.price) || 0, // Convierte el valor a número y usa 0 como valor predeterminado
                stock: parseInt(req.body.stock) || 100,
                description: req.body.description,
                description2: req.body.description2,
                image: imageFiles || undefined,
                image1: image1Files || undefined,
                image2: image2Files || undefined,
                image3: image3Files || undefined,
                image4: image4Files || undefined
            }, { where: { id: req.body.id } });
        } else {
            // Crear un nuevo producto
            await Product.create({
                name: req.body.name,
                category: req.body.category,
                brand: req.body.brand,
                model: req.body.model,
                specs1: req.body.specs1,
                specs2: req.body.specs2,
                specs3: req.body.specs3,
                price: parseFloat(req.body.price) || 0, // Convierte el valor a número y usa 0 como valor predeterminado
                stock: parseInt(req.body.stock) || 100,
                description: req.body.description,
                description2: req.body.description2,
                image: imageFiles,
                image1: image1Files,
                image2: image2Files,
                image3: image3Files,
                image4: image4Files
            });
        }
    
        return res.redirect('/products/productList'); // Redirige a la lista de productos
    },

    delete: async (req, res) => {
        await Product.destroy({ where: { id: req.params.id } });
        return res.redirect('/');
    },

    load: (req, res) => {
        return res.render("products/productLoad", {
            title: "Agregar Productos",
            errors: [] // Inicializar el array de errores
        });
    },


    // Mostrar lista de todos los productos
list: async (req, res) => {
    try {
        const productos = await Product.findAll();
        
        // Convertir el precio a número para cada producto
        productos.forEach(product => {
            product.price = parseFloat(product.price); // Asegúrate de que price sea un número
        });
        
        console.log("Productos recuperados:", productos);
        return res.render("products/productList", {
            title: "Lista de Productos",
            productos: productos
        });
    } catch (error) {
        console.error("Error al recuperar productos:", error);
        return res.status(500).send("Error al recuperar productos");
    }
},

    // Mostrar detalles de un producto
    details: async (req, res) => {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).send("Producto no encontrado");
        }

        return res.render("products/productDetail", {
            title: "Detalle de producto",
            product: product
        });
    },
    // Mostrar productos por categoría
    showByCategory: async (req, res) => {
        const { category } = req.params; // Obtiene la categoría desde la URL
    
        try {
            const productos = await Product.findAll({ where: { category } });
    
            if (productos.length === 0) {
                return res.status(404).send('No se encontraron productos en esta categoría.');
            }
    
            return res.render('products/category', {
                title: `Productos de la categoría: ${category}`,
                productos: productos
            });
        } catch (error) {
            console.error("Error al recuperar productos por categoría:", error);
            return res.status(500).send("Error al recuperar productos");
        }
    },
    searchSuggestions: async (req, res) => {
        const query = req.query.query.toLowerCase();
        
        try {
            const suggestions = await Product.findAll({
                where: {
                    name: {
                        [Op.like]: `%${query}%` // Busca coincidencias en el nombre del producto
                    }
                },
                limit: 5 // Limita a las primeras 5 sugerencias
            });
    
            return res.json(suggestions); // Envía las sugerencias como respuesta JSON
        } catch (error) {
            console.error("Error al obtener sugerencias:", error);
            return res.status(500).send("Error al obtener sugerencias");
        }
    },
    searchResults: async (req, res) => {
        const query = req.query.query; // Obtén la consulta de búsqueda
    
        // Busca productos que coincidan con la consulta
        const products = await Product.findAll({
            where: {
                name: {
                    [Op.like]: `%${query}%` // Usa LIKE para buscar productos que coincidan
                }
            }
        });
    
        if (products.length === 0) {
            // Si no se encuentran productos, muestra un mensaje
            return res.render('products/searchResults', {
                title: 'Resultados de búsqueda',
                message: 'No se encontraron productos disponibles.',
                products: [] // Pasa un arreglo vacío
            });
        }
    
        // Renderiza la vista con los productos encontrados
        return res.render('products/searchResults', {
            title: 'Resultados de búsqueda',
            products // Pasa los productos encontrados
        });
    }
        
};

module.exports = details;
