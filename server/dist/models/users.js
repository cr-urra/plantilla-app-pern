"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database/database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var users = _database.database.define('user', {
  id: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  rut: {
    type: _sequelize["default"].INTEGER
  },
  nombre: {
    type: _sequelize["default"].TEXT
  },
  apellido: {
    type: _sequelize["default"].TEXT
  },
  roles_id: {
    type: _sequelize["default"].INTEGER
  },
  password: {
    type: _sequelize["default"].TEXT
  }
}, {
  timestamps: false
});

var _default = users;
exports["default"] = _default;