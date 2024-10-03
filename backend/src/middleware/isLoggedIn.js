// src/middleware/isLoggedIn.js

module.exports = (req, res, next) => {
    if (req.session.user) {
        return next(); // Si hay sesión, continúa
    } else {
        req.flash('error', 'Debes iniciar sesión para acceder al carrito.'); // Agrega un mensaje flash
        return res.redirect('/user/login'); // Redirige si no hay sesión activa
    }
};
