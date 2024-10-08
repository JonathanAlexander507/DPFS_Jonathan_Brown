const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, // Habilita el autoincremento
        primaryKey: true // Define esta columna como la clave primaria
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    category: {
        type: DataTypes.STRING(100)
    },
    brand: {
        type: DataTypes.STRING(100)
    },
    model: {
        type: DataTypes.STRING(100)
    },
    specs1: {
        type: DataTypes.STRING(255)
    },
    specs2: {
        type: DataTypes.STRING(255)
    },
    specs3: {
        type: DataTypes.STRING(255)
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
        type: DataTypes.TEXT
    },
    image: {
        type: DataTypes.STRING(255)
    },
    image1: {
        type: DataTypes.STRING(255)
    },
    image2: {
        type: DataTypes.STRING(255)
    },
    image3: {
        type: DataTypes.STRING(255)
    },
    image4: {
        type: DataTypes.STRING(255)
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW // Establecer la fecha actual como valor predeterminado
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW // Establecer la fecha actual como valor predeterminado
    }
});

module.exports = Product;
