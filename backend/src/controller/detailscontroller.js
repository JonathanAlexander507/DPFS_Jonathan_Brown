const fs = require('fs');
let productos = require('../../database/productos.json');

let details = {
    // Editar producto por ID
edit: (req, res) => {
    let productId = req.params.id; // Obtener ID de la URL
    let product = productos.find(p => p.id == productId);

    // Verificar si el producto existe
    if (!product) {
        return res.render("products/productEdit", {
            title: "Editar Producto",
            product: null // No hay producto, mostrar solo la barra de búsqueda
        });
    }

    return res.render("products/productEdit", {
        title: "Editar Producto",
        product: product
    });
},
    // Mostrar los detalles de un producto
    details: (req, res) => {
        let productId = req.params.id;
        let product = productos.find(p => p.id == productId);

        if (!product) {
            return res.status(404).send("Producto no encontrado");
        }

        return res.render("products/productDetail", {
            title: "Detalle de producto",
            product: product
        });
    },

    // Editar producto por ID
    edit: (req, res) => {
        let productId = req.params.id; // Obtener ID de la URL
        let product = productos.find(p => p.id == productId);

        // Verificar si el producto existe
        if (!product) {
            return res.render("products/productEdit", {
                title: "Editar Producto",
                product: null // No hay producto, mostrar solo la barra de búsqueda
            });
        }

        return res.render("products/productEdit", {
            title: "Editar Producto",
            product: product
        });
    },

    // Guardar el producto (crear o actualizar)
    save: (req, res) => {
        let productId = req.body.id;

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
                    price: req.body.price,
                    description: req.body.description,
                    description2: req.body.description2,
                    image: req.body.image,
                    image1: req.body.image1,
                    image2: req.body.image2,
                    image3: req.body.image3,
                    image4: req.body.image4
                };
            }
        } else {
            // Agregar nuevo producto
            let newProduct = {
                id: productos.length+1, // Generar un ID único
                name: req.body.name,
                category: req.body.category,
                brand: req.body.brand,
                model: req.body.model,
                specs1: req.body.specs1,
                specs2: req.body.specs2,
                specs3: req.body.specs3,
                price: req.body.price,
                description: req.body.description,
                description2: req.body.description2,
                image: req.body.image,
                image1: req.body.image1,
                image2: req.body.image2,
                image3: req.body.image3,
                image4: req.body.image4
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
            title: "Agregar Productos"
        });
    }
};

module.exports = details;
