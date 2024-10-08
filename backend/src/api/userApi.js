const express = require('express');
const router = express.Router();
const User = require('../../database/models/user');



// Endpoint para obtener todos los usuarios
router.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        const count = users.length; // contar los usuarios
        res.json({ count, users });  // Devuelve un objeto con count y users
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
});

// userApi.js
router.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
});


module.exports = router;
