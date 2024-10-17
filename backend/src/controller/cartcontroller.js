let Cart = require('../../database/models/Cart'); // Importar el modelo de Cart
let Product = require('../../database/models/Product'); // Importar el modelo de Product

let cart = {
    // Mostrar el carrito
    showCart: async (req, res) => {
        try {
            // Asegúrate de que el usuario esté en la sesión
            if (!req.session.user || !req.session.user.id) {
                return res.status(400).send("Usuario no logueado o no se encontró el ID del usuario.");
            }

            // Buscar los productos en el carrito del usuario logueado
            const cartItems = await Cart.findAll({
                where: { user_id: req.session.user.id }, // Cambiado a 'id' en lugar de 'user_id'
                include: [{
                    model: Product,
                    as: 'Product' // Asegúrate de usar el alias definido en la asociación
                }]
            });
                // Convertir los precios a números
        cartItems.forEach(item => {
            item.Product.price = parseFloat(item.Product.price);
        });
            return res.render("cart/productCart", {
                title: "Carrito de compras",
                user: req.session.user,
                cartItems
            });
        } catch (error) {
            console.error("Error al mostrar el carrito:", error);
            return res.status(500).send("Error al mostrar el carrito");
        }
    },

    // Agregar un producto al carrito
    addToCart: async (req, res) => {
        try {
            const { product_id, quantity } = req.body;

            // Verificar si el producto ya está en el carrito
            const existingItem = await Cart.findOne({
                where: {
                    user_id: req.session.user.id, // Cambiado a 'id' en lugar de 'user_id'
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
                    user_id: req.session.user.id, // Cambiado a 'id' en lugar de 'user_id'
                    product_id: product_id,
                    quantity: quantity
                });
            }

            return res.redirect('/cart/productCart');
        } catch (error) {
            console.error("Error al agregar al carrito:", error);
            return res.status(500).send("Error al agregar al carrito");
        }
    },

    // Actualizar la cantidad de un producto en el carrito
    updateCart: async (req, res) => {
        try {
            const { product_id, quantity } = req.body;

            // Actualizamos la cantidad del producto en el carrito
            await Cart.update(
                { quantity: quantity },
                {
                    where: {
                        user_id: req.session.user.id, // Cambiado a 'id' en lugar de 'user_id'
                        product_id: product_id
                    }
                }
            );

            return res.redirect('/cart/productCart');
        } catch (error) {
            console.error("Error al actualizar el carrito:", error);
            return res.status(500).send("Error al actualizar el carrito");
        }
    },

    // Eliminar un producto del carrito
    removeFromCart: async (req, res) => {
        try {
            const { product_id } = req.body;

            // Eliminamos el producto del carrito
            await Cart.destroy({
                where: {
                    user_id: req.session.user.id, // Cambiado a 'id' en lugar de 'user_id'
                    product_id: product_id
                }
            });

            return res.redirect('/cart/productCart');
        } catch (error) {
            console.error("Error al eliminar del carrito:", error);
            return res.status(500).send("Error al eliminar del carrito");
        }
    }
}

module.exports = cart;
