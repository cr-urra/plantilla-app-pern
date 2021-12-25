const express = require('express');
const router = express.Router();
import * as roles from '../controllers/roles.controller.js';

// roles

router.get('/', roles.getAllRoles);

module.exports = router;