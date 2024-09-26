
let productos = require('../../database/productos.json')
let home = {
    index: (req, res) => {
        return res.render("index",{
            title: "Game Store 507",
            list:productos
        })
    }
}
module.exports = home