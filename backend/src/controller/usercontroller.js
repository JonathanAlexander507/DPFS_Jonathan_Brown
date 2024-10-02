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

    // Procesa la información del registro
    processRegister: async  (req, res) => {
        // Validar los errores en la solicitud
        const errors = validationResult(req);

        // Si hay errores, re-renderiza la página con los errores y los datos ingresados
        if (!errors.isEmpty()) {
            return res.render("user/register", {
                title: "Registro",
                errors: errors.array(),
                oldData: req.body
            });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Crea el nuevo usuario a partir de los datos del formulario
        const newUser = {
            user_id: Date.now(), // Genera un ID único basado en el timestamp
            name: req.body.name,
            last_name: req.body.last_name,
            profile_image: req.file ? req.file.filename : '', // Si se subió una foto, se guarda el nombre del archivo
            email: req.body.email,
            province: req.body.province,
            user_type: req.body.user_type, // Guardar el tipo de usuario
            password: hashedPassword
        };

        // Lee el archivo JSON de usuarios
        const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));

        // Agrega el nuevo usuario a la lista de usuarios
        users.push(newUser);

        // Escribe los nuevos datos en el archivo JSON
        fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2));

        // Redirige al login después del registro exitoso
        return res.redirect('/');
    },

    // Renderiza la vista de login
    login: (req, res) => {
        return res.render('user/login', {
            title: 'Login'
        });
    }
};

module.exports = user;
