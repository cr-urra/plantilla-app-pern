"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usuario = exports.superUsuario = exports.administrador = exports.verifyToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _users = _interopRequireDefault(require("../models/users"));

var _roles = _interopRequireDefault(require("../models/roles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var verifyToken = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var token, decoded, id, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            token = req.cookies.token;
            !token && res.json({
              resul: null,
              message: "Ha ocurrido un problema con la autenticación"
            });
            decoded = _jsonwebtoken["default"].verify(token, _config["default"].SECRET);
            id = decoded.id;
            req.id = id;
            _context.next = 8;
            return _users["default"].findOne({
              where: {
                id: id
              },
              attributes: ['id', 'rut', 'nombre', 'apellido', 'roles_id']
            });

          case 8:
            user = _context.sent;
            !user && res.json({
              resul: null,
              message: "No se encuentra el usuario"
            });
            next();
            _context.next = 17;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.json({
              resul: false,
              message: "Ha ocurrido un problema, token expirado"
            });

          case 17:
            ;

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 13]]);
  }));

  return function verifyToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.verifyToken = verifyToken;

var administrador = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var rut, user, id, rol;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            rut = req.params.rut;
            _context2.next = 3;
            return _users["default"].findOne({
              where: {
                rut: rut
              },
              attributes: ['id', 'rut', 'nombre', 'apellido', 'roles_id']
            });

          case 3:
            user = _context2.sent;
            id = user.roles_id;
            _context2.next = 7;
            return _roles["default"].findOne({
              where: {
                id: id
              },
              attributes: ['id', 'cod_rol', 'nombre']
            });

          case 7:
            rol = _context2.sent;
            rol.cod_rol === "adm" ? next() : res.json({
              resul: false,
              message: "Su usuario no se encuentra autorizado"
            });

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function administrador(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.administrador = administrador;

var superUsuario = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    var rut, user, id, rol;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            rut = req.body.rut;
            _context3.next = 3;
            return _users["default"].findOne({
              where: {
                rut: rut
              },
              attributes: ['id', 'rut', 'nombre', 'apellido', 'roles_id']
            });

          case 3:
            user = _context3.sent;
            id = user.roles_id;
            _context3.next = 7;
            return _roles["default"].findOne({
              where: {
                id: id
              },
              attributes: ['id', 'cod_rol', 'nombre']
            });

          case 7:
            rol = _context3.sent;
            rol.cod_rol === "sup" ? next() : res.json({
              resul: false,
              message: "Su usuario no se encuentra autorizado"
            });

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function superUsuario(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.superUsuario = superUsuario;

var usuario = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
    var rut, user, id, rol;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            rut = req.body.rut;
            _context4.next = 3;
            return _users["default"].findOne({
              where: {
                rut: rut
              },
              attributes: ['id', 'rut', 'nombre', 'apellido', 'roles_id']
            });

          case 3:
            user = _context4.sent;
            id = user.roles_id;
            _context4.next = 7;
            return _roles["default"].findOne({
              where: {
                id: id
              },
              attributes: ['id', 'cod_rol', 'nombre']
            });

          case 7:
            rol = _context4.sent;
            rol.cod_rol === "usr" ? next() : res.json({
              resul: false,
              message: "Su usuario no se encuentra autorizado"
            });

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function usuario(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.usuario = usuario;