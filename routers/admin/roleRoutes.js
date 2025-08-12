const express = require('express');
const router = express.Router();
const roleController = require('../../controllers/admin/roleController');
const isAuthenticated = require('../../middlewares/isAuthenticated');
const hasPermission = require('../../middlewares/hasPermission');

router.use(isAuthenticated);
router.use(hasPermission("MANAGE_ROLES"));

router.get('/', roleController.getAllRoles);
router.post('/', roleController.createRole);
router.put('/:roleId/permissions', roleController.updateRolePermissions);

module.exports = router;
