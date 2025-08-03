const express = require('express');
const router = express.Router();
const permissionController = require('../../controllers/admin/permissionController');
const isAuthenticated = require('../../middlewares/isAuthenticated');
const hasPermission = require('../../middlewares/hasPermission');

router.use(isAuthenticated);
router.use(hasPermission("MANAGE_ROLES"));

router.get('/', permissionController.getAllPermissions);
router.post('/', permissionController.createPermission);

module.exports = router;
