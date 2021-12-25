"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRol = exports.logOut = exports.verifyUsr = exports.verifySup = exports.verifyAdm = exports.signIn = exports.signUp = exports.consulRol = exports.encryptPassword = exports.comparePassword = void 0;

var _users = _interopRequireDefault(require("../models/users"));

var _roles = _interopRequireDefault(require("../models/roles"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _config = _interopRequireDefault(require("../config"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var comparePassword = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(password, receivePassword) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _bcryptjs["default"].compare(password, receivePassword);

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function comparePassword(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.comparePassword = comparePassword;

var encryptPassword = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(password) {
    var salt;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _bcryptjs["default"].genSalt(10);

          case 2:
            salt = _context2.sent;
            _context2.next = 5;
            return _bcryptjs["default"].hash(password, salt);

          case 5:
            return _context2.abrupt("return", _context2.sent);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function encryptPassword(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.encryptPassword = encryptPassword;

var consulRol = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
    var codRol;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _roles["default"].findOne({
              where: {
                id: id
              },
              attributes: ['cod_rol']
            });

          case 2:
            codRol = _context3.sent;
            return _context3.abrupt("return", codRol);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function consulRol(_x4) {
    return _ref3.apply(this, arguments);
  };
}();

exports.consulRol = consulRol;

var signUp = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$body, rut, nombre, apellido, roles_id, password, newUsers, user_token;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body = req.body, rut = _req$body.rut, nombre = _req$body.nombre, apellido = _req$body.apellido, roles_id = _req$body.roles_id, password = _req$body.password;
            _context4.prev = 1;
            _context4.t0 = _users["default"];
            _context4.t1 = rut;
            _context4.t2 = nombre;
            _context4.t3 = apellido;
            _context4.t4 = roles_id;
            _context4.next = 9;
            return encryptPassword(password);

          case 9:
            _context4.t5 = _context4.sent;
            _context4.t6 = {
              rut: _context4.t1,
              nombre: _context4.t2,
              apellido: _context4.t3,
              roles_id: _context4.t4,
              password: _context4.t5
            };
            _context4.t7 = {
              fields: ['rut', 'nombre', 'apellido', 'roles_id', 'password']
            };
            _context4.next = 14;
            return _context4.t0.create.call(_context4.t0, _context4.t6, _context4.t7);

          case 14:
            newUsers = _context4.sent;

            if (newUsers) {
              user_token = _jsonwebtoken["default"].sign({
                id: newUsers.id
              }, _config["default"].SECRET, {
                expiresIn: 120
              });
              res.json({
                message: "Usuario registrado correctamente",
                data: newUsers,
                token: user_token
              });
            }

            ;
            _context4.next = 23;
            break;

          case 19:
            _context4.prev = 19;
            _context4.t8 = _context4["catch"](1);
            console.log(_context4.t8);
            res.status(500).json({
              message: "Problemas al registrar usuario, contactese con el administrador del sistema",
              data: {}
            });

          case 23:
            ;

          case 24:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 19]]);
  }));

  return function signUp(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();

exports.signUp = signUp;

var signIn = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var rut, bool, user, matchPassword, user_token, codRol, result;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            rut = req.body.rut;
            bool = false;
            _context5.next = 4;
            return _users["default"].findOne({
              where: {
                rut: rut
              },
              attributes: ['id', 'rut', 'nombre', 'apellido', 'roles_id', 'password']
            });

          case 4:
            user = _context5.sent;

            if (!user) {
              _context5.next = 25;
              break;
            }

            _context5.next = 8;
            return comparePassword(req.body.password, user.password);

          case 8:
            matchPassword = _context5.sent;
            user_token = null;

            if (!matchPassword) {
              _context5.next = 21;
              break;
            }

            user_token = _jsonwebtoken["default"].sign({
              id: user.id
            }, _config["default"].SECRET, {
              expiresIn: 120
            });
            res.cookie('token', user_token, {
              httpOnly: true
            });
            _context5.next = 15;
            return consulRol(user.roles_id);

          case 15:
            codRol = _context5.sent;
            result = {
              nombre: user.nombre,
              apellido: user.apellido,
              cod_rol: codRol.cod_rol
            };
            bool = true;
            res.json({
              Resultado: bool,
              Usuario: result,
              token: user_token
            });
            _context5.next = 22;
            break;

          case 21:
            res.json({
              resultado: bool,
              message: "Password incorrecta"
            });

          case 22:
            ;
            _context5.next = 26;
            break;

          case 25:
            res.json({
              resultado: bool,
              message: "Usuario no encontrado"
            });

          case 26:
            ;

          case 27:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function signIn(_x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}();

exports.signIn = signIn;

var verifyAdm = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var token, verifyDecoded, aux, decoded, id, user, rol;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            token = req.cookies.token;
            !token && res.json({
              resul: null,
              cod_rol: "",
              message: "Ha ocurrido un problema con la autenticación"
            });
            verifyDecoded = null;
            aux = _jsonwebtoken["default"].verify(token, _config["default"].SECRET, function (err) {
              verifyDecoded = err;
            });

            if (!(verifyDecoded !== null)) {
              _context6.next = 8;
              break;
            }

            res.json({
              resul: null,
              cod_rol: "",
              message: "Su sesión ha expirado"
            });
            _context6.next = 18;
            break;

          case 8:
            decoded = _jsonwebtoken["default"].verify(token, _config["default"].SECRET);
            id = decoded.id;
            _context6.next = 12;
            return _users["default"].findOne({
              where: {
                id: id
              },
              attributes: ['roles_id']
            });

          case 12:
            user = _context6.sent;
            id = user.roles_id;
            _context6.next = 16;
            return _roles["default"].findOne({
              where: {
                id: id
              },
              attributes: ['cod_rol']
            });

          case 16:
            rol = _context6.sent;
            rol.cod_rol === "adm" ? res.json({
              resul: true,
              cod_rol: rol.cod_rol,
              message: ""
            }) : res.json({
              resul: false,
              cod_rol: rol.cod_rol,
              message: "Su usuario no se encuentra autorizado para acceder a esta interfaz"
            });

          case 18:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function verifyAdm(_x9, _x10) {
    return _ref6.apply(this, arguments);
  };
}();

exports.verifyAdm = verifyAdm;

var verifySup = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var token, verifyDecoded, aux, decoded, id, user, rol;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            token = req.cookies.token;
            !token && res.json({
              resul: null,
              cod_rol: "",
              message: "Ha ocurrido un problema con la autenticación"
            });
            verifyDecoded = null;
            aux = _jsonwebtoken["default"].verify(token, _config["default"].SECRET, function (err) {
              verifyDecoded = err;
            });

            if (!(verifyDecoded !== null)) {
              _context7.next = 8;
              break;
            }

            res.json({
              resul: null,
              cod_rol: "",
              message: "Su sesión ha expirado"
            });
            _context7.next = 18;
            break;

          case 8:
            decoded = _jsonwebtoken["default"].verify(token, _config["default"].SECRET);
            id = decoded.id;
            _context7.next = 12;
            return _users["default"].findOne({
              where: {
                id: id
              },
              attributes: ['roles_id']
            });

          case 12:
            user = _context7.sent;
            id = user.roles_id;
            _context7.next = 16;
            return _roles["default"].findOne({
              where: {
                id: id
              },
              attributes: ['cod_rol']
            });

          case 16:
            rol = _context7.sent;
            rol.cod_rol === "sup" ? res.json({
              resul: true,
              cod_rol: rol.cod_rol,
              message: ""
            }) : res.json({
              resul: false,
              cod_rol: rol.cod_rol,
              message: "Su usuario no se encuentra autorizado para acceder a esta interfaz"
            });

          case 18:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function verifySup(_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();

exports.verifySup = verifySup;

var verifyUsr = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var token, verifyDecoded, aux, decoded, id, user, rol;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            token = req.cookies.token;
            !token && res.json({
              resul: null,
              cod_rol: "",
              message: "Ha ocurrido un problema con la autenticación"
            });
            verifyDecoded = null;
            aux = _jsonwebtoken["default"].verify(token, _config["default"].SECRET, function (err) {
              verifyDecoded = err;
            });

            if (!(verifyDecoded !== null)) {
              _context8.next = 8;
              break;
            }

            res.json({
              resul: null,
              cod_rol: "",
              message: "Su sesión ha expirado"
            });
            _context8.next = 18;
            break;

          case 8:
            decoded = _jsonwebtoken["default"].verify(token, _config["default"].SECRET);
            id = decoded.id;
            _context8.next = 12;
            return _users["default"].findOne({
              where: {
                id: id
              },
              attributes: ['roles_id']
            });

          case 12:
            user = _context8.sent;
            id = user.roles_id;
            _context8.next = 16;
            return _roles["default"].findOne({
              where: {
                id: id
              },
              attributes: ['cod_rol']
            });

          case 16:
            rol = _context8.sent;
            rol.cod_rol === "usr" ? res.json({
              resul: true,
              cod_rol: rol.cod_rol,
              message: ""
            }) : res.json({
              resul: false,
              cod_rol: rol.cod_rol,
              message: "Su usuario no se encuentra autorizado para acceder a esta interfaz"
            });

          case 18:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function verifyUsr(_x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}();

exports.verifyUsr = verifyUsr;

var logOut = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var user_token;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            user_token = "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
            res.cookie('token', user_token, {
              httpOnly: true
            });
            res.json({
              resul: null,
              message: "Se ha cerrado la sesión"
            });

          case 3:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function logOut(_x15, _x16) {
    return _ref9.apply(this, arguments);
  };
}();

exports.logOut = logOut;

var getRol = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
    var token, verifyDecoded, aux, decoded, id, user, rol;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            token = req.cookies.token;
            !token && res.json({
              resultado: false,
              cod_rol: "",
              message: ""
            });
            verifyDecoded = null;
            aux = _jsonwebtoken["default"].verify(token, _config["default"].SECRET, function (err) {
              verifyDecoded = err;
            });

            if (!(verifyDecoded !== null)) {
              _context10.next = 8;
              break;
            }

            res.json({
              resultado: false,
              cod_rol: "",
              message: ""
            });
            _context10.next = 18;
            break;

          case 8:
            decoded = _jsonwebtoken["default"].verify(token, _config["default"].SECRET);
            id = decoded.id;
            _context10.next = 12;
            return _users["default"].findOne({
              where: {
                id: id
              },
              attributes: ['roles_id']
            });

          case 12:
            user = _context10.sent;
            id = user.roles_id;
            _context10.next = 16;
            return _roles["default"].findOne({
              where: {
                id: id
              },
              attributes: ['cod_rol']
            });

          case 16:
            rol = _context10.sent;
            res.json({
              resultado: true,
              codRol: rol.cod_rol,
              message: ""
            });

          case 18:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function getRol(_x17, _x18) {
    return _ref10.apply(this, arguments);
  };
}();

exports.getRol = getRol;