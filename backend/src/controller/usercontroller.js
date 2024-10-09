const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../../database/models/user');
const user = {
    // Renderiza la vista del formulario de registro
    registro: (req, res) => {
        return res.render("user/register", {
            title: "Registro",
            errors: [],
            oldData: {}
        });
    },

    processRegister: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("user/register", {
                title: "Registro",
                errors: errors.array(),
                oldData: req.body
            });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        
        // Guardar el nuevo usuario en la base de datos
        const newUser = await User.create({
            name: req.body.name,
            last_name: req.body.last_name,
            profile_image: req.file ? req.file.filename : '',
            email: req.body.email,
            province: req.body.province,
            user_type: req.body.user_type,
            password: hashedPassword
        });

        // Iniciar sesión después de registrarse
        req.session.user = { 
            id: newUser.user_id, 
            name: newUser.name,
            last_name: newUser.last_name,
            email: newUser.email, 
            user_type: newUser.user_type,
            profile_image: newUser.profile_image
        };

        // Configurar cookie con una duración prolongada
        res.cookie('user_session', req.session.user, {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días
            httpOnly: true
        });

        return res.redirect('/user/profile');
    },

    login: (req, res) => {
        return res.render('user/login', {
            title: 'Login',
            errors: [],
            oldData: {}
        });
    },

    processLogin: async (req, res) => {
        const errors = validationResult(req);
        let customErrors = [];

        if (!errors.isEmpty()) {
            return res.render('user/login', {
                title: 'Login',
                errors: errors.array(),
                oldData: req.body
            });
        }

        // Buscar al usuario en la base de datos por email
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) {
            customErrors.push({ msg: 'Correo electrónico incorrecto.', param: 'email' });
            return res.render('user/login', {
                title: 'Login',
                errors: customErrors,
                oldData: req.body
            });
        }

        // Comparar la contraseña con la base de datos
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            customErrors.push({ msg: 'Contraseña incorrecta.', param: 'password' });
            return res.render('user/login', {
                title: 'Login',
                errors: customErrors,
                oldData: req.body
            });
        }

        // Guardar los datos del usuario en la sesión
        req.session.user = {
            id: user.user_id,
            name: user.name,
            last_name: user.last_name,
            email: user.email,
            user_type: user.user_type,
            province: user.province,
            profile_image: user.profile_image
        };

        return res.redirect('/user/profile');
    },

    profile: (req, res) => {
        if (!req.session.user) {
            return res.redirect('/user/login');
        }

        return res.render('user/profile', {
            title: 'Perfil',
            user: req.session.user
        });
    },

    logout: (req, res) => {
        req.session.destroy(err => {
            if (err) {
                return res.redirect('/'); 
            }
            res.clearCookie('connect.sid'); 
            res.redirect('/user/login'); 
        });
    },

    deleteAccount: async (req, res) => {
        if (!req.session.user) {
            return res.redirect('/user/login');
        }

        // Eliminar el usuario de la base de datos
        await User.destroy({ where: { email: req.session.user.email } });
        req.session.destroy();
        res.status(200).json({ message: "Cuenta eliminada exitosamente" });
    },
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll({
                attributes: ['user_id', 'name', 'email'] // Selecciona los campos que necesitas
            });
            return res.json({
                count: users.length,
                users: users // Devuelve un objeto con la cantidad y el array de usuarios
            });
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            res.status(500).json({ message: "Error al obtener usuarios" });
        }
    }
};


module.exports = user;
