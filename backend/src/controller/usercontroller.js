let user = {
    registro: (req, res) => {
        return res.render("user/register",{
            title: "Registro"
        })
    },
    login: (req, res) => {
        return res.render("user/login", {
            title: "login"
        })
    }
}
module.exports = user