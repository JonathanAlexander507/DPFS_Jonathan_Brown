let details = {
    details: (req, res) => {
        return res.render("products/productDetail",{
            title: "Detalle de producto"
        })
    }
}
module.exports = details