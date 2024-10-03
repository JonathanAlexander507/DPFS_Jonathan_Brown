let contacto = {
    contacto: (req, res) => {
        return res.render("contact",{
            title: "Contactanos",
            user: req.session.user
        })
    },
    
}
module.exports = contacto