const fs = require('fs');
const sequelize = require('./config/database');
const User = require('./models/user');
const Product = require('./models/Product');

// Leer datos de los JSON
const usersData = JSON.parse(fs.readFileSync('./user.json', 'utf-8'));
const productsData = JSON.parse(fs.readFileSync('./productos.json', 'utf-8'));

async function insertData() {
    try {
        // Sincronizar las tablas
        await sequelize.sync({ force: true });  // Usa force: true solo en desarrollo, borra las tablas y las vuelve a crear
        
        // Insertar usuarios
        await User.bulkCreate(usersData);
        console.log('Usuarios insertados correctamente');

        // Insertar productos
        await Product.bulkCreate(productsData);
        console.log('Productos insertados correctamente');

        process.exit(); // Terminar el proceso una vez que se complete
    } catch (error) {
        console.error('Error al insertar los datos:', error);
    }
}

insertData();
