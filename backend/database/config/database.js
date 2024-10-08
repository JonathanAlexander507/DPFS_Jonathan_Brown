const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('GameStore507', 'root', 'root', {
   host: 'localhost',
   dialect: 'mysql'
});

module.exports = sequelize;
