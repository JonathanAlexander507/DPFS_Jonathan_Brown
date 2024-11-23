const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

// Ruta al archivo JSON de usuarios
const userFilePath = path.join(__dirname, '../../database/users.json');

// Función para leer datos del archivo JSON
const readJSON = (filePath) => {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, 'utf-8');
    return data ? JSON.parse(data) : [];
};

// Función para escribir datos en el archivo JSON
const writeJSON = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const userController = {
    registro: (req, res) => {
        return res.render("user/register", {
            title: "Registro",
            errors: [],
            oldData: {}
        });
    },

    processRegister: async (req, res) => {
        const users = readJSON(userFilePath);
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render("user/register", {
                title: "Registro",
                errors: errors.array(),
                oldData: req.body
            });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = {
            id: users.length ? users[users.length - 1].id + 1 : 1, // Generar un nuevo ID
            name: req.body.name,
            last_name: req.body.last_name,
            email: req.body.email,
            province: req.body.province,
            user_type: req.body.user_type,
            profile_image: req.file ? req.file.filename : '',
            password: hashedPassword
        };

        users.push(newUser);
        writeJSON(userFilePath, users);

        // Iniciar sesión automáticamente después del registro
        req.session.user = {
            id: newUser.id,
            name: newUser.name,
            last_name: newUser.last_name,
            email: newUser.email,
            user_type: newUser.user_type,
            profile_image: newUser.profile_image
        };

        // Crear una cookie para la sesión del usuario
        res.cookie('user_session', req.session.user, {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días
            httpOnly: true
        });

        res.redirect('/user/profile');
    },

    login: (req, res) => {
        return res.render('user/login', {
            title: 'Login',
            errors: [],
            oldData: {}
        });
    },

    processLogin: async (req, res) => {
        const users = readJSON(userFilePath);
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render('user/login', {
                title: 'Login',
                errors: errors.array(),
                oldData: req.body
            });
        }

        const user = users.find(u => u.email === req.body.email);

        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
            return res.render('user/login', {
                title: 'Login',
                errors: [{ msg: 'Credenciales inválidas', param: 'email' }],
                oldData: req.body
            });
        }

        req.session.user = {
            id: user.id,
            name: user.name,
            last_name: user.last_name,
            email: user.email,
            user_type: user.user_type,
            province: user.province,
            profile_image: user.profile_image
        };

        res.redirect('/user/profile');
    },

    profile: (req, res) => {
        if (!req.session.user) {
            return res.redirect('/user/login');
        }

        res.render('user/profile', {
            title: 'Perfil',
            user: req.session.user
        });
    },

    logout: (req, res) => {
        req.session.destroy(err => {
            if (err) return res.redirect('/');
            res.clearCookie('connect.sid');
            res.redirect('/user/login');
        });
    },

    deleteAccount: (req, res) => {
        if (!req.session.user) {
            return res.redirect('/user/login');
        }

        let users = readJSON(userFilePath);
        users = users.filter(user => user.id !== req.session.user.id);

        writeJSON(userFilePath, users);
        req.session.destroy();
        res.status(200).json({ message: "Cuenta eliminada exitosamente" });
    },

    getAllUsers: (req, res) => {
        const users = readJSON(userFilePath);
        const sanitizedUsers = users.map(({ id, name, email }) => ({ id, name, email }));
    
        // Si deseas devolver los usuarios en formato JSON (si es para un API)
        return res.json({
            count: sanitizedUsers.length,
            users: sanitizedUsers
        });
    },

    getUserById: (req, res) => {
        const users = readJSON(userFilePath);
        const user = users.find(u => u.id === parseInt(req.params.id));

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json({
            id: user.id,
            name: user.name,
            last_name: user.last_name,
            email: user.email,
            profile_image: user.profile_image ? `/images/users/profile_photo/${user.profile_image}` : null
        });
    }
};

module.exports = userController;
