let cart = {
    showCart: (req, res) => {
        return res.render("cart/productCart",{
            title: "Carrito de compras",
            user: req.session.user
        })
    },
    
}
module.exports = cart