var express = require('express');
var router = express.Router();
let controller = require('../controller/usercontroller')

/* GET home page. */
router.get('/user/register', controller.registro);
router.get('/user/login', controller.login);


module.exports = router;
