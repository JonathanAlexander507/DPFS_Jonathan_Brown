const express = require('express');
const router = express.Router();
const Product = require('../../database/models/Product'); // Asegúrate de que la ruta sea correcta
const { Op } = require('sequelize'); // Para operaciones de Sequelize

// Endpoint para obtener todos los productos
router.get('/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

// Endpoint para obtener los detalles de un producto por ID
router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: ['categories'], // Incluir categorías
        });
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Respuesta con la estructura solicitada
        const response = {
            id: product.id,
            name: product.name,
            description: product.description,
            categories: product.categories, // Relación uno a muchos
            image: `/images/products/${product.image}`, // Ruta a la imagen
            // Añade otras propiedades según tu modelo
        };

        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

module.exports = router;
