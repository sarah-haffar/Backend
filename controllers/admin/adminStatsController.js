const db = require('../../models'); 

const { User, Order, Part, CarBrand, CarModel, OrderItem, sequelize } = db;
const { Op } = require('sequelize');
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
 *                 topBrands:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "PEUGEOT"
 *                       modelCount:
 *                         type: integer
 *                         example: 12
 *                 topSellingParts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       partId:
 *                         type: integer
 *                         example: 3
 *                       quantitySold:
 *                         type: integer
 *                         example: 250
 *       401:
 *         description: Non autorisé - token manquant ou invalide
 *       403:
 *         description: Accès refusé - permissions insuffisantes
 *       500:
 *         description: Erreur interne du serveur
 */
exports.getStats = async (req, res) => {
  try {
    const [totalUsers, totalOrders, totalProducts] = await Promise.all([
      User.count(),
      Order.count(),
      Part.count()
    ]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const ordersToday = await Order.count({
      where: {
        createdAt: {
          [Op.gte]: today
        }
      }
    });

    const topBrands = await CarBrand.findAll({
      include: [{
        model: CarModel,
        as: 'models',
        attributes: []
      }],
      attributes: [
        'name',
        [sequelize.fn('COUNT', sequelize.col('models.id')), 'modelCount']
      ],
      group: ['CarBrand.id'],
      order: [[sequelize.literal('modelCount'), 'DESC']],
      limit: 5
    });

    const topSellingParts = await OrderItem.findAll({
      include: ['part'], // assure-toi que la relation est bien définie dans tes modèles
      attributes: [
        'partId',
        [sequelize.fn('SUM', sequelize.col('quantity')), 'quantitySold']
      ],
      group: ['partId'],
      order: [[sequelize.literal('quantitySold'), 'DESC']],
      limit: 5
    });

    res.json({
      totalUsers,
      totalOrders,
      ordersToday,
      totalProducts,
      topBrands,
      topSellingParts
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération des statistiques" });
  }
};
