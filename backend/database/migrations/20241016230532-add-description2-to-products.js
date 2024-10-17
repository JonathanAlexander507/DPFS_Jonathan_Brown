'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'description2', {
      type: Sequelize.TEXT,
      allowNull: true // Cambia a false si quieres que sea obligatoria
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'description2');
  }
};

