// Cart.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product'); // Asegúrate de importar el modelo de Product

const Cart = sequelize.define('Cart', {
    cart_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
}, {
    tableName: 'carts'
});

// Definir la asociación entre Cart y Product
Cart.belongsTo(Product, {
    foreignKey: 'product_id',
    as: 'Product'
});

module.exports = Cart;
