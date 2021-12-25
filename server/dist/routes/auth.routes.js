"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _authController = require("../controllers/auth.controller.js");

var verifySignUp = _interopRequireWildcard(require("../middlewares/verifySignUp.js"));

var authJwt = _interopRequireWildcard(require("../middlewares/authJwt"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var express = require('express');

var router = express.Router();
// auth
router.get('/', authJwt.verifyToken);
router.get('/adm/', _authController.verifyAdm);
router.get('/sup/', _authController.verifySup);
router.get('/usr/', _authController.verifyUsr);
router.post('/signin', _authController.signIn);
router.get('/getRol', _authController.getRol);
router.post('/signup', verifySignUp.verifyUser, _authController.signUp);
router.get('/logout', _authController.logOut);
module.exports = router;