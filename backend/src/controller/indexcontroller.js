
let productos = require('../../database/productos.json')
let home = {
    index: (req, res) => {
        return res.render("index",{
            title: "Game Store 507",
            list:productos,
            user: req.session.user
        })
    }
}
module.exports = home