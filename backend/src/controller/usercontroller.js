const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

// Ruta del archivo JSON donde se guardarán los usuarios
const userFilePath = path.join(__dirname, '../../database/user.json');

// Asegúrate de que el archivo user.json exista antes de intentar leerlo
if (!fs.existsSync(userFilePath)) {
    fs.writeFileSync(userFilePath, JSON.stringify([])); // Crea un archivo vacío si no existe
}

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
        const newUser = {
            user_id: Date.now(),
            name: req.body.name,
            last_name: req.body.last_name,
            profile_image: req.file ? req.file.filename : '',
            email: req.body.email,
            province: req.body.province,
            user_type: req.body.user_type,
            password: hashedPassword
        };
    
        const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
        users.push(newUser);
        fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2));
    
        // Iniciar sesión después de registrarse
        req.session.user = { 
            id: newUser.user_id, 
            name: newUser.name,
            last_name: user.last_name,
            email: newUser.email, 
            user_type: newUser.user_type,
            profile_image: user.profile_image
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
            errors: [], // Puedes pasar aquí los errores si los hay
            oldData: {} // Asegúrate de que oldData esté definido
        });
    },

    // Procesa la información de inicio de sesión
    processLogin: async (req, res) => {
        const errors = validationResult(req);
    
        // Inicializar un array de errores
        let customErrors = [];
    
        if (!errors.isEmpty()) {
            return res.render('user/login', {
                title: 'Login',
                errors: errors.array(),
                oldData: req.body // Mantener los datos ingresados por el usuario
            });
        }
    
        // Leer el archivo JSON de usuarios
        const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
        const user = users.find(u => u.email === req.body.email);
    
        // Verificar si el correo es correcto
        if (!user) {
            customErrors.push({ msg: 'Correo electrónico incorrecto.', param: 'email' });
            return res.render('user/login', {
                title: 'Login',
                errors: customErrors,  // Pasar el error de correo incorrecto
                oldData: req.body
            });
        }
    
        // Verificar si la contraseña es correcta
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            customErrors.push({ msg: 'Contraseña incorrecta.', param: 'password' });
            return res.render('user/login', {
                title: 'Login',
                errors: customErrors,  // Pasar el error de contraseña incorrecta
                oldData: req.body
            });
        }
    
        // Si todo es correcto, guardar datos del usuario en la sesión
        req.session.user = {
            id: user.user_id,
            name: user.name,
            last_name: user.last_name,
            email: user.email,
            user_type: user.user_type,
            province: user.province,
            profile_image: user.profile_image
        };
    
        // Redirigir al perfil
        return res.redirect('/user/profile');
    },
    

    // Renderiza la vista del perfil de usuario
    profile: (req, res) => {
        if (!req.session.user) {
            return res.redirect('/user/login');
        }

        return res.render('user/profile', {
            title: 'Perfil',
            user: req.session.user
        });
    },

    // Cerrar sesión
    logout: (req, res) => {
        req.session.destroy(err => {
            if (err) {
                return res.redirect('/'); 
            }
            res.clearCookie('connect.sid'); 
            res.redirect('/user/login'); 
        });
    },
    // Eliminar cuenta
deleteAccount: (req, res) => {
    if (!req.session.user) {
        return res.redirect('/user/login'); // Redirige si no hay sesión activa
    }

    const userEmail = req.session.user.email; // Obtiene el correo del usuario de la sesión
    let users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8')); // Carga los usuarios existentes

    // Filtra el usuario a eliminar
    users = users.filter(user => user.email !== userEmail);

    // Escribe los datos actualizados en el archivo JSON
    fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2));
    req.session.destroy(); // Cierra la sesión del usuario
    res.status(200).json({ message: "Cuenta eliminada exitosamente" }); // Envía una respuesta exitosa
}

};

module.exports = user;
