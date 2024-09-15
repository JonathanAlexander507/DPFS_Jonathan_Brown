let details = {
    index: (req, res) => {
        return res.render("productDetails",{
            title: "Detalle de producto"
        })
    }
}
module.exports = details