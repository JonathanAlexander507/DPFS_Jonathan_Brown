var express = require('express');
var router = express.Router();
let controller = require('../controller/contactscontroller')

/* GET home page. */
router.get('/contact', controller.contacto);


module.exports = router;
