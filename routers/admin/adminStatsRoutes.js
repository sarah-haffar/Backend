const express = require('express');
const router = express.Router();
const adminStatsController = require('../../controllers/admin/adminStatsController');
const isAuthenticated = require('../../middlewares/isAuthenticated');
const hasPermission = require('../../middlewares/hasPermission');

/**
 * @swagger
 * /api/admin/stats:
 *   get:
 *     summary: Obtenir les statistiques globales pour le shop administrateur
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
 *                   example: 100
 *                 totalOrders:
 *                   type: integer
 *                   example: 250
 *                 ordersToday:
 *                   type: integer
 *                   example: 5
 *                 totalProducts:
 *                   type: integer
 *                   example: 150
 *                 topSellingParts:
 *                   type: array
 *                   description: Liste des pièces les plus vendues
 *                   items:
 *                     type: object
 *                     properties:
 *                       partId:
 *                         type: integer
 *                         example: 3
 *                       quantitySold:
 *                         type: integer
 *                         example: 250
 *                       part:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 3
 *                           name:
 *                             type: string
 *                             example: "Plaquette de frein"
 *                           brand:
 *                             type: string
 *                             example: "Brembo"
 *                 earningsPerMonth:
 *                   type: array
 *                   description: Revenus des 4 derniers mois
 *                   items:
 *                     type: object
 *                     properties:
 *                       month:
 *                         type: string
 *                         example: "2025-07"
 *                       earnings:
 *                         type: number
 *                         format: float
 *                         example: 1243.50
 *       401:
 *         description: Non autorisé - token manquant ou invalide
 *       403:
 *         description: Accès refusé - permissions insuffisantes
 *       500:
 *         description: Erreur serveur
 */
router.get(
  '/stats',
  isAuthenticated,
  hasPermission("VIEW_STATS"),
  adminStatsController.getStats
);

module.exports = router;
