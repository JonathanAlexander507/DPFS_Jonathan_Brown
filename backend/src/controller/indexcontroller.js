const fs = require('fs');
const path = require('path');

const productFilePath = path.join(__dirname, '../../database/productos.json');

const readJSON = (filePath) => {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, 'utf-8');
    return data ? JSON.parse(data) : [];
};

let home = {
    index: (req, res) => {
        const products = readJSON(productFilePath);
        res.render("index", {
            title: "Game Store 507",
            list: products,
            user: req.session.user
        });
    }
};

module.exports = home;
