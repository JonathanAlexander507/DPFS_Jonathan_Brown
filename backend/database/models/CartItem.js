const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cart = require('./Cart');
const Product = require('./Product'); // Importa el modelo de productos

const CartItem = sequelize.define('CartItem', {
  cart_item_id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  cart_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: Cart,
      key: 'cart_id', // Relación con la tabla de carritos
    },
  },
  product_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: Product,
      key: 'id', // Relación con la tabla de productos
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

module.exports = CartItem;
