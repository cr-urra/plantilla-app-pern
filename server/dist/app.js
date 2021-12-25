"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("@babel/polyfill");

var _rolesRoutes = _interopRequireDefault(require("./routes/roles.routes.js"));

var _usersRoutes = _interopRequireDefault(require("./routes/users.routes.js"));

var _authRoutes = _interopRequireDefault(require("./routes/auth.routes.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var express = require('express');

var morgan = require('morgan');

var path = require('path');

var cors = require('cors');

var cookieParser = require('cookie-parser');

require('./database/association'); //inicialización


var app = express(); //settings

app.set('port', process.env.PORT || 4000); //middlewares server

app.use(cookieParser());
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json()); //variables globales

app.use(function (req, res, next) {
  next();
}); //Importar rutas

//routes
app.use('/users', _usersRoutes["default"]);
app.use('/auth', _authRoutes["default"]);
app.use('/roles', _rolesRoutes["default"]); //public
//app.use(express.static('../public'));

var _default = app;
exports["default"] = _default;