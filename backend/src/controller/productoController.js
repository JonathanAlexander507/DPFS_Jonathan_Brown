const fs = require('fs');
const path = require('path');

// Cargar productos desde el archivo JSON
const productos = JSON.parse(fs.readFileSync(path.join(__dirname, '../../database/productos.json')));

exports.obtenerProductoPorId = (req, res) => {
    const id = req.params.id;
    
    // Buscar el producto con el ID solicitado
    const producto = productos.find(p => p.id == id);

    if (producto) {
        // Renderizar la vista con los datos del producto
        res.render('productDetail', { producto });
    } else {
        res.status(404).send('Producto no encontrado');
    }
};
