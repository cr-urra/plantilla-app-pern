"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var roles = _database.database.define('role', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  cod_rol: {
    type: _sequelize["default"].TEXT
  },
  nombre: {
    type: _sequelize["default"].TEXT
  }
}, {
  timestamps: false
});

var _default = roles;
exports["default"] = _default;