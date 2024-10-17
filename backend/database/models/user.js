const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('user', {
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
},{
        tableName: 'users', // Asegúrate de que coincida con el nombre de la tabla en tu base de datos
        timestamps: true // Asegúrate de que esto esté establecido en true para incluir createdAt y updatedAt
    });

module.exports = User;
