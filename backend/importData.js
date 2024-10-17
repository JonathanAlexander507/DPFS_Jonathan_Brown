// importData.js
const fs = require('fs');
const sequelize = require('./database/config/database'); // Ajusta la ruta según la ubicación de tu archivo
const Product = require('./database/models/Product'); // Ajusta la ruta según la ubicación de tu modelo

const importData = async () => {
    try {
        // Leer y parsear el archivo JSON de productos
        const productsData = JSON.parse(fs.readFileSync('./database/productos.json', 'utf8')); // Ajusta la ruta

        // Importar productos usando bulkCreate
        await Product.bulkCreate(productsData, { validate: true });

        console.log('Productos importados exitosamente');
    } catch (error) {
        console.error('Error al importar los productos:', error);
    } finally {
        await sequelize.close(); // Cerrar la conexión después de la importación
    }
};

// Llama a la función de importación
importData();
