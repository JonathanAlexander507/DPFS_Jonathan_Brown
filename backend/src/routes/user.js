const express = require('express');
const router = express.Router();
const upload = require('../middleware/profile_photo');
const { check } = require('express-validator');
const userController = require('../controller/usercontroller');

// Validaciones
const registerValidations = [
    check('name').isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres.'),
    check('last_name').isLength({ min: 3 }).withMessage('El apellido debe tener al menos 3 caracteres.'),
    check('email').isEmail().withMessage('Debe ingresar un correo electrónico válido.'),
    check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.')
    .matches(/\d/).withMessage('La contraseña debe tener al menos un número.')
    .matches(/[A-Z]/).withMessage('La contraseña debe tener al menos una letra mayúscula.')
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('La contraseña debe tener al menos un carácter especial.'),
    check('confirm_password').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden.');
        }
        return true;
    }),
    check('province').notEmpty().withMessage('Debe seleccionar una provincia.'),
    check('email').notEmpty().withMessage('El correo electrónico es obligatorio.')
];

// Rutas
router.get('/register', userController.registro);
router.post('/register', upload.single('profile_image'), registerValidations, userController.processRegister);
router.get('/login', userController.login);
router.post('/login', [check('email').notEmpty(), check('password').notEmpty()], userController.processLogin);
router.get('/profile', userController.profile); 
router.delete('/delete', userController.deleteAccount); 
router.get('/logout', userController.logout);



module.exports = router;
