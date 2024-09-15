var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./src/routes/index');
const userRouter = require('./src/routes/user')
const cartRouter = require('./src/routes/cart')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', cartRouter);
app.use('/', userRouter);


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
