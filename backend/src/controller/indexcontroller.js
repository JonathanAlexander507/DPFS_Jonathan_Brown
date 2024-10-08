const Product = require('../../database/models/Product'); // Ruta corregida según tu estructura de carpetas

let home = {
    index: async (req, res) => {
        try {
            // Obtener los productos desde la base de datos
            const productos = await Product.findAll();

            return res.render("index", {
                title: "Game Store 507",
                list: productos,
                user: req.session.user
            });
        } catch (error) {
            console.error("Error al obtener los productos:", error);
            return res.status(500).send("Error al cargar los productos");
        }
    }
}

module.exports = home;
