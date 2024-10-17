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
    },
    addToCart: async (req, res) => {
        try {
            const { product_id, quantity } = req.body;
    
            // Verificar si el producto ya está en el carrito
            const existingItem = await Cart.findOne({
                where: {
                    user_id: req.session.user.user_id,
                    product_id: product_id
                }
            });
    
            if (existingItem) {
                // Si ya está, simplemente actualizamos la cantidad
                existingItem.quantity += parseInt(quantity);
                await existingItem.save();
            } else {
                // Si no está, lo agregamos al carrito
                await Cart.create({
                    user_id: req.session.user.user_id,
                    product_id: product_id,
                    quantity: quantity
                });
            }
    
            return res.redirect('/cart/productCart'); // Redirigir al carrito después de añadir
        } catch (error) {
            console.error("Error al agregar al carrito:", error);
            return res.status(500).send("Error al agregar al carrito");
        }
    }
}

module.exports = home;
