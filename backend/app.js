var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
var indexRouter = require('./src/routes/index');
const contactoRouter = require('./src/routes/contacts');
const userRouter = require('./src/routes/user')
const cartRouter = require('./src/routes/cart')
const detailsRouter = require('./src/routes/details')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/', contactoRouter);
app.use('/', cartRouter);
app.use('/user', userRouter);
app.use('/', detailsRouter);
app.use('/database', express.static(path.join(__dirname, 'database')));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).render("error", {
      title: "Error 404",
      message: "Página no encontrada",
    });
  });
  
  // Manejador de errores
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render("error", {
      title: "Error 500",
      message: "Error interno del servidor",
    });
  });

module.exports = app;
