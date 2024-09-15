let cart = {
    cart: (req, res) => {
        return res.render("cart/productCart",{
            title: "Carrito de compras"
        })
    },
    
}
module.exports = cart