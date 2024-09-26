let productos = require('../../database/productos.json');

let details = {
    details: (req, res) => {
        // Obtener el ID del producto desde la URL
        let productId = req.params.id;
        // Buscar el producto en el archivo JSON
        let product = productos.find(p => p.id == productId);
        
        // Si no se encuentra el producto, redirigir o mostrar error
        if (!product) {
            return res.status(404).send("Producto no encontrado");
        }
        
        // Renderizar la vista con el producto específico
        return res.render("products/productDetail", {
            title: "Detalle de producto",
            product: product
        });
    },
    edit: (req, res) => {
        return res.render("products/productEdit", {
            title: "Editar Productos"
        });
    },
    load: (req, res) => {
        return res.render("products/productLoad", {
            title: "Agregar Productos"
        });
    }
};

module.exports = details;