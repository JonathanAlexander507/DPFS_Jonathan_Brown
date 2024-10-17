// Product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    category: {
        type: DataTypes.STRING(100),
        allowNull: false // Asegúrate de que la categoría sea obligatoria
    },
    brand: {
        type: DataTypes.STRING(100), // Agregado
        allowNull: false // Puedes decidir si debe ser obligatorio
    },
    model: {
        type: DataTypes.STRING(100), // Agregado
        allowNull: false // Puedes decidir si debe ser obligatorio
    },
    specs1: {
        type: DataTypes.STRING(255), // Agregado
    },
    specs2: {
        type: DataTypes.STRING(255), // Agregado
    },
    specs3: {
        type: DataTypes.STRING(255), // Agregado
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 100
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description2: {
        type: DataTypes.TEXT, // Agregado
    },
    image: {
        type: DataTypes.STRING(255), // Imagen principal
        allowNull: false
    },
    image1: {
        type: DataTypes.STRING(255), // Agregado
    },
    image2: {
        type: DataTypes.STRING(255), // Agregado
    },
    image3: {
        type: DataTypes.STRING(255), // Agregado
    },
    image4: {
        type: DataTypes.STRING(255), // Agregado
    }
}, {
    tableName: 'products'
});

module.exports = Product;
