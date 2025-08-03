const express = require('express');
const router = express.Router();
const adminStatsController = require('../../controllers/admin/adminStatsController');
const isAuthenticated = require('../../middlewares/isAuthenticated');
const hasPermission = require('../../middlewares/hasPermission');

/**
 * @swagger
 * /api/admin/stats:
 *   get:
 *     summary: Obtenir les statistiques globales pour l'administrateur
 *     tags:
 *       - AdminStats
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Statistiques récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: integer
 *                 totalOrders:
 *                   type: integer
 *                 ordersToday:
 *                   type: integer
 *                 totalProducts:
 *                   type: integer
 *                 topBrands:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       modelCount:
 *                         type: integer
 *                 topSellingParts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       partId:
 *                         type: integer
 *                       quantitySold:
 *                         type: integer
 *       401:
 *         description: Non autorisé - token manquant ou invalide
 *       403:
 *         description: Accès refusé - permissions insuffisantes
 *       500:
 *         description: Erreur serveur
 */
router.get('/stats', isAuthenticated, hasPermission("VIEW_STATS"), adminStatsController.getStats);

module.exports = router;
