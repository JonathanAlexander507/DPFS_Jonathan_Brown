const fs = require('fs');
const path = require('path');

// Ruta al archivo JSON de productos
const productFilePath = path.join(__dirname, '../../database/productos.json');

// Leer JSON
const readJSON = (filePath) => {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, 'utf-8');
    return data ? JSON.parse(data) : [];
};

// Escribir JSON
const writeJSON = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const details = {
    // Mostrar lista de productos
    list: (req, res) => {
        const products = readJSON(productFilePath);
        res.render("products/productList", {
            title: "Lista de Productos",
            productos: products
        });
    },

    // Mostrar detalle de un producto
    details: (req, res) => {
        const products = readJSON(productFilePath);
        const product = products.find(p => p.id === parseInt(req.params.id));
    
        if (!product) {
            return res.status(404).send("Producto no encontrado");
        }
    
        res.render("products/productDetail", {
            title: "Detalle de producto",
            product
        });
    },

    // Guardar (crear/editar) producto
    save: (req, res) => {
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
            const products = readJSON(productFilePath);
    
            const product = {
                id: req.body.id || null,
                name: req.body.name || '',
                category: req.body.category || '',
                price: req.body.price || '',
                stock: req.body.stock || '',
                description: req.body.description || ''
            };
    
            return res.render(req.body.id ? "products/productEdit" : "products/productLoad", {
                title: req.body.id ? "Editar Producto" : "Agregar Producto",
                product,
                errors: errors.array() // Envía los errores a la vista
            });
        }
    
        const products = readJSON(productFilePath);
        const { id, name, category, price, stock, description } = req.body;
    
        if (id) {
            // Actualizar producto existente
            const productIndex = products.findIndex(p => p.id === parseInt(id));
            if (productIndex !== -1) {
                products[productIndex] = { ...products[productIndex], name, category, price, stock, description };
            }
        } else {
            // Crear nuevo producto
            const newId = products.length ? products[products.length - 1].id + 1 : 1;
            products.push({ id: newId, name, category, price, stock, description });
        }
    
        writeJSON(productFilePath, products);
        res.redirect('/products/productList');
    },

    // Eliminar producto
    delete: (req, res) => {
        let products = readJSON(productFilePath);
        products = products.filter(p => p.id !== parseInt(req.params.id));
        writeJSON(productFilePath, products);
        res.redirect('/products/productList');
    },

    // Mostrar productos por categoría
    showByCategory: (req, res) => {
        const products = readJSON(productFilePath);
        const filteredProducts = products.filter(p => p.category === req.params.category);
        if (filteredProducts.length === 0) return res.status(404).send("No se encontraron productos en esta categoría.");

        res.render("products/category", {
            title: `Categoría: ${req.params.category}`,
            productos: filteredProducts
        });
    },

    // Buscar productos
    searchResults: (req, res) => {
        const products = readJSON(productFilePath);
        const query = req.query.query.toLowerCase();
        const results = products.filter(p => p.name.toLowerCase().includes(query));

        if (results.length === 0) {
            return res.render("products/searchResults", {
                title: "Resultados de búsqueda",
                message: "No se encontraron productos.",
                productos: []
            });
        }

        res.render("products/searchResults", {
            title: "Resultados de búsqueda",
            products: results
        });
    },

    // API para listar productos en JSON
    listJson: (req, res) => {
        const products = readJSON(productFilePath);
        res.json({
            count: products.length,
            products
        });
    },

    // API para conteos de productos
    getProductCounts: (req, res) => {
        const products = readJSON(productFilePath);
        const countByCategory = products.reduce((acc, product) => {
            acc[product.category] = (acc[product.category] || 0) + 1;
            return acc;
        }, {});

        res.json({
            count: products.length,
            countByCategory
        });
    },

    // Mostrar página de edición/agregar producto
    edit: (req, res) => {
        const products = readJSON(productFilePath);
    
        let product = {};
        if (req.params.id) {
            product = products.find(p => p.id === parseInt(req.params.id));
            if (!product) {
                return res.status(404).send("Producto no encontrado");
            }
        }
    
        res.render("products/productEdit", {
            title: product.id ? "Editar Producto" : "Agregar Producto",
            product,
            errors: [] // Asegúrate de pasar errores aunque esté vacío
        });
    },
    
    // Mostrar página de agregar producto
    load: (req, res) => {
        res.render("products/productLoad", {
            title: "Agregar Producto",
            errors: [] // Asegúrate de pasar errores aunque esté vacío
        });
    }
    
};

module.exports = details;
