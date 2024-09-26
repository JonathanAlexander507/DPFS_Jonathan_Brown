const fs = require('fs');
let productos = require('../../database/productos.json');

let details = {
    // Mostrar la página de edición/agregar producto
    edit: (req, res) => {
        let productId = req.params.id;
        let product = productos.find(p => p.id == productId);
        return res.render("products/productEdit", {
            title: "Editar o Agregar Producto",
            product: product
        });
    },
    
    // Guardar el producto (agregar o editar)
    save: (req, res) => {
        let productId = req.body.id;
        if (productId) {
            // Editar producto existente
            let productIndex = productos.findIndex(p => p.id == productId);
            if (productIndex != -1) {
                productos[productIndex] = {
                    id: productId,
                    name: req.body.name,
                    price: req.body.price,
                    description: req.body.description,
                    image: req.body.image
                };
            }
        } else {
            // Agregar nuevo producto
            let newProduct = {
                id: Date.now().toString(), // Generar un ID único
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                image: req.body.image
            };
            productos.push(newProduct);
        }
        // Guardar cambios en el archivo JSON
        fs.writeFileSync('./database/productos.json', JSON.stringify(productos, null, 2));
        return res.redirect('/'); // Redirigir a la página de inicio
    },

    // Eliminar producto
    delete: (req, res) => {
        let productId = req.params.id;
        productos = productos.filter(p => p.id != productId);
        // Guardar cambios en el archivo JSON
        fs.writeFileSync('./database/productos.json', JSON.stringify(productos, null, 2));
        return res.redirect('/');
    }
};

module.exports = details;