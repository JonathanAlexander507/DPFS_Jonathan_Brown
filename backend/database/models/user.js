const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.BIGINT,  // Cambia a BIGINT para admitir números grandes
        autoIncrement: true,      // Asegúrate de que esté configurado para autoincrementar
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    profile_image: {
        type: DataTypes.STRING(255)
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
    },
    province: {
        type: DataTypes.STRING(100)
    },
    user_type: {
        type: DataTypes.ENUM('cliente', 'administrador'),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
});

module.exports = User;
