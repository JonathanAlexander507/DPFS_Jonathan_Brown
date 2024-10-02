const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Ruta corregida a 'public/images/users/profile_photo'
        cb(null, path.join(__dirname, '../../public/images/users/profile_photo'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname).toLowerCase());
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|raw/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('El archivo debe ser en formato jpeg, jpg, png o raw.'));
    }
});

module.exports = upload;
