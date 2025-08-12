const express = require("express");
const router = express.Router();
const db = require("../models");

const isAuthenticated = require("../middlewares/isAuthenticated");
const hasPermission = require("../middlewares/hasPermission");

// Middleware global appliqué à toutes les routes
router.use(isAuthenticated);
router.use(hasPermission("MANAGE_USERS"));

// Middleware async handler pour catch auto des erreurs
const asyncHandler = fn => (req, res, next) => fn(req, res, next).catch(next);

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Gestion des utilisateurs, rôles et permissions
 */

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Lister tous les utilisateurs
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs avec rôles
 */
router.get("/users", asyncHandler(async (req, res) => {
  const users = await db.User.findAll({
    include: [{ model: db.Role, as: "role" }],
  });
  res.json(users);
}));

/**
 * @swagger
 * /api/admin/users/{userId}:
 *   get:
 *     summary: Détails d’un utilisateur
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *       404:
 *         description: Utilisateur non trouvé
 */
router.get("/users/:userId", asyncHandler(async (req, res) => {
  const user = await db.User.findByPk(req.params.userId, {
    include: [{ model: db.Role, as: "role" }],
  });
  if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });
  res.json(user);
}));

/**
 * @swagger
 * /api/admin/users/{userId}/role:
 *   put:
 *     summary: Modifier le rôle d’un utilisateur
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roleId
 *             properties:
 *               roleId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Rôle mis à jour
 *       404:
 *         description: Utilisateur ou rôle non trouvé
 */
router.put("/users/:userId/role", asyncHandler(async (req, res) => {
  const { roleId } = req.body;
  const user = await db.User.findByPk(req.params.userId);
  if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

  const role = await db.Role.findByPk(roleId);
  if (!role) return res.status(404).json({ error: "Rôle non trouvé" });

  user.role_id = roleId;
  await user.save();
  res.json({ message: "Rôle mis à jour avec succès" });
}));

/**
 * @swagger
 * /api/admin/roles:
 *   get:
 *     summary: Lister tous les rôles
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des rôles avec permissions
 */
router.get("/roles", asyncHandler(async (req, res) => {
  const roles = await db.Role.findAll({
    include: [{ model: db.Permission, as: "permissions" }],
  });
  res.json(roles);
}));

/**
 * @swagger
 * /api/admin/permissions:
 *   get:
 *     summary: Lister toutes les permissions disponibles
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des permissions
 */
router.get("/permissions", asyncHandler(async (req, res) => {
  const permissions = await db.Permission.findAll();
  res.json(permissions);
}));

/**
 * @swagger
 * /api/admin/roles/{roleId}/permissions:
 *   put:
 *     summary: Mettre à jour les permissions d’un rôle
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du rôle
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - permissions
 *             properties:
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["MANAGE_USERS", "VIEW_SHOP"]
 *     responses:
 *       200:
 *         description: Permissions mises à jour
 *       404:
 *         description: Rôle non trouvé
 */
router.put("/roles/:roleId/permissions", hasPermission("MANAGE_ROLES"), asyncHandler(async (req, res) => {
  const { permissions } = req.body;
  const role = await db.Role.findByPk(req.params.roleId);
  if (!role) return res.status(404).json({ error: "Rôle non trouvé" });

  const allPermissions = await db.Permission.findAll();
  const matchedPermissions = allPermissions.filter(p => permissions.includes(p.code));

  await role.setPermissions(matchedPermissions);
  res.json({ message: "Permissions mises à jour avec succès" });
}));

module.exports = router;
