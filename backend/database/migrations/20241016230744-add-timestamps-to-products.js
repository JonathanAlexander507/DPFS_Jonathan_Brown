'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'createdAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW'),
    });
    await queryInterface.addColumn('products', 'updatedAt', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW'),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'createdAt');
    await queryInterface.removeColumn('products', 'updatedAt');
  }
};
