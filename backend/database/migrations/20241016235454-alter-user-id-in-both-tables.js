'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Cambiar el tipo de dato de user_id en la tabla Users
    await queryInterface.changeColumn('Users', 'user_id', {
      type: Sequelize.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    });

    // Cambiar el tipo de dato de user_id en la tabla Carts
    await queryInterface.changeColumn('Carts', 'user_id', {
      type: Sequelize.BIGINT,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'user_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    // Revertir el cambio a INTEGER en Users
    await queryInterface.changeColumn('Users', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    });

    // Revertir el cambio a INTEGER en Carts
    await queryInterface.changeColumn('Carts', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'user_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  }
};
