const express = require('express');
const router = express.Router();
const userAdminController = require('../../controllers/admin/userAdminController');
const isAuthenticated = require('../../middlewares/isAuthenticated');
const hasPermission = require('../../middlewares/hasPermission');

router.use(isAuthenticated);
router.use(hasPermission("MANAGE_USERS")); // ou "MANAGE_ROLES" si tu préfères

router.put('/:userId/role', userAdminController.assignRoleToUser);

module.exports = router;
