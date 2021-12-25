"use strict";

var _users = _interopRequireDefault(require("../models/users"));

var _roles = _interopRequireDefault(require("../models/roles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// M:N
_users["default"].hasMany(_roles["default"], {
  foreingKey: 'roles_id',
  sourceKey: 'id'
});

_roles["default"].belongsTo(_users["default"], {
  foreingKey: 'roles_id',
  sourceKey: 'id'
});