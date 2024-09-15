
let home = {
    index: (req, res) => {
        return res.render("index",{
            title: "Game Store 507"
        })
    }
}
module.exports = home