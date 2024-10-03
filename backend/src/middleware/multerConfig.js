const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,  path.join(__dirname, '../../public/images/products')); // Carpeta donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        // Extraer el nombre original del archivo
        const originalName = path.parse(file.originalname).name;
        const extension = path.extname(file.originalname);
        
        // Generar un nuevo nombre para la imagen
        cb(null, `${originalName}${extension}`); // Para la imagen principal
    }
});

// Filtros de archivo para permitir solo ciertos tipos de imagen
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Aceptar el archivo
    } else {
        cb(new Error('Formato de imagen no permitido'), false); // Rechazar el archivo
    }
};

// Crear el middleware de multer
const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;
