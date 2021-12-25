"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyUser = void 0;

var _users = _interopRequireDefault(require("../models/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var verifyUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var rut, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            rut = req.body.rut;
            console.log(rut);
            _context.next = 4;
            return _users["default"].findOne({
              where: {
                rut: rut
              },
              attributes: ['id', 'rut', 'nombre', 'apellido', 'roles_id']
            });

          case 4:
            user = _context.sent;
            user ? res.json({
              message: "El rut ingresado ya se encuentra registrado",
              rut: user.rut
            }) : next();

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function verifyUser(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.verifyUser = verifyUser;