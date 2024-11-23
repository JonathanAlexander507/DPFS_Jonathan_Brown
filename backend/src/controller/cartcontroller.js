const fs = require('fs');
const path = require('path');

// Rutas a los archivos JSON
const cartFilePath = path.join(__dirname, '../../database/cart.json');
const productFilePath = path.join(__dirname, '../../database/productos.json');

// Función para leer datos del archivo JSON
const readJSON = (filePath) => {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, 'utf-8');
    return data ? JSON.parse(data) : [];
};

// Función para escribir datos en el archivo JSON
const writeJSON = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

let cart = {
    showCart: (req, res) => {
        if (!req.session.user) {
            return res.status(400).send("Usuario no logueado.");
        }

        const cartItems = readJSON(cartFilePath);
        const products = readJSON(productFilePath);

        const userCartItems = cartItems.filter(item => item.user_id === req.session.user.id);

        const enrichedCartItems = userCartItems.map(item => {
            const product = products.find(p => p.id === parseInt(item.product_id));
            const price = product ? parseFloat(product.price) : 0;

            return {
                ...item,
                Product: {
                    ...product,
                    price,
                    image: product?.image || 'default.jpg'
                },
                subtotal: price * item.quantity
            };
        });

        const total = enrichedCartItems.reduce((acc, item) => acc + item.subtotal, 0);
        const tax = total * 0.07;

        res.render("cart/productCart", {
            title: "Carrito de compras",
            user: req.session.user,
            cartItems: enrichedCartItems,
            total,
            tax,
            grandTotal: total + tax
        });
    },

    addToCart: (req, res) => {
        if (!req.session.user) {
            return res.status(403).send("Debes iniciar sesión para agregar productos al carrito.");
        }

        const { product_id, quantity } = req.body;
        const cartItems = readJSON(cartFilePath);

        const existingItemIndex = cartItems.findIndex(
            item => item.user_id === req.session.user.id && parseInt(item.product_id) === parseInt(product_id)
        );

        if (existingItemIndex !== -1) {
            cartItems[existingItemIndex].quantity += parseInt(quantity, 10);
        } else {
            cartItems.push({
                user_id: req.session.user.id,
                product_id: parseInt(product_id),
                quantity: parseInt(quantity, 10)
            });
        }

        writeJSON(cartFilePath, cartItems);
        res.redirect('/cart/productCart');
    },

    updateCart: (req, res) => {
        if (!req.session.user) {
            return res.status(403).send("Debes iniciar sesión para actualizar el carrito.");
        }

        const { product_id, quantity } = req.body;

        const cartItems = readJSON(cartFilePath);

        const itemIndex = cartItems.findIndex(
            item => item.user_id === req.session.user.id && parseInt(item.product_id) === parseInt(product_id)
        );

        if (itemIndex !== -1) {
            cartItems[itemIndex].quantity = parseInt(quantity, 10);
            writeJSON(cartFilePath, cartItems);
        } else {
            return res.status(404).send("El producto no existe en el carrito.");
        }

        res.redirect('/cart/productCart');
    },

    removeFromCart: (req, res) => {
        if (!req.session.user) {
            return res.status(403).send("Debes iniciar sesión para eliminar productos del carrito.");
        }

        const { product_id } = req.body;

        let cartItems = readJSON(cartFilePath);

        cartItems = cartItems.filter(
            item => !(item.user_id === req.session.user.id && parseInt(item.product_id) === parseInt(product_id))
        );

        writeJSON(cartFilePath, cartItems);
        res.redirect('/cart/productCart');
    }
};

module.exports = cart;
