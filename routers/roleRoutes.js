const express = require('express');
const router = express.Router();
const controller = require('../controllers/roleController');

/**
 * @swagger
 * /api/roles/{roleId}/permissions:
 *   put:
 *     summary: Update the permissions of a role
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         description: ID of the role
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *             example:
 *               permissions: ["MANAGE_USERS", "VIEW_SHOP"]
 *     responses:
 *       200:
 *         description: Permissions updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 */
router.put('/:roleId/permissions', controller.updateRolePermissions);
module.exports = router;
