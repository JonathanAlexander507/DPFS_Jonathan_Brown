const express = require('express');
const router = express.Router();
const userController = require('../controller/usercontroller');
const { check } = require('express-validator');

// Validaciones para el registro
const registerValidations = [
    check('name').isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres.'),
    check('last_name').isLength({ min: 3 }).withMessage('El apellido debe tener al menos 3 caracteres.'),
    check('email').isEmail().withMessage('Debe ingresar un correo electrónico válido.'),
    check('password')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.')
        .matches(/\d/).withMessage('La contraseña debe tener al menos un número.'),
    check('confirm_password').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden.');
        }
        return true;
    }),
    check('province').notEmpty().withMessage('Debe seleccionar una provincia.'),
    check('email').notEmpty().withMessage('El correo electrónico es obligatorio.')
];

// Rutas para el manejo de usuarios
router.get('/register', userController.registro); // Página de registro
router.post('/register', registerValidations, userController.processRegister); // Procesar registro

router.get('/login', userController.login); // Página de inicio de sesión
router.post('/login', [check('email').notEmpty(), check('password').notEmpty()], userController.processLogin); // Procesar login

router.get('/profile', userController.profile); // Página de perfil
router.delete('/delete', userController.deleteAccount); // Eliminar cuenta
router.get('/logout', userController.logout); // Cerrar sesión

router.get('/users', userController.getAllUsers); // Obtener todos los usuarios
router.get('/users/:id', userController.getUserById); // Obtener un usuario por ID

module.exports = router;
