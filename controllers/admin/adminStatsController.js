const { User, Order, Part, OrderItem, sequelize } = require('../../models');
const { Op } = require('sequelize');
const { fn, col, literal } = sequelize;
exports.getStats = async (req, res) => {
  try {
    // Stats globales
    const [totalUsers, totalOrders, totalProducts] = await Promise.all([
      User.count(),
      Order.count(),
      Part.count()
    ]);

    // Commandes d’aujourd’hui
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const ordersToday = await Order.count({
      where: {
        created_at: {
          [Op.gte]: today
        }
      }
    });

    // Top 5 des pièces les plus vendues
    const topSellingParts = await OrderItem.findAll({
      include: [{ model: Part, as: 'part' }],
      attributes: [
        'part_id',
        [fn('SUM', col('quantity')), 'quantitySold']
      ],
      group: ['part_id', 'part.id'],
      order: [[literal('quantitySold'), 'DESC']],
      limit: 5
    });

    // Earnings des 4 derniers mois
    const fourMonthsAgo = new Date();
    fourMonthsAgo.setDate(1);
    fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 3);

    const earningsPerMonth = await Order.findAll({
      attributes: [
        [sequelize.literal("DATE_FORMAT(created_at, '%Y-%m')"), 'month'],
        [fn('SUM', col('total_amount')), 'earnings']
      ],
      where: {
        created_at: {
          [Op.gte]: fourMonthsAgo
        },
        payment_status: 'paid'
      },
      group: [sequelize.literal("DATE_FORMAT(created_at, '%Y-%m')")],
      order: [[sequelize.literal("DATE_FORMAT(created_at, '%Y-%m')"), 'ASC']],
      raw: true
    });

    res.json({
      totalUsers,
      totalOrders,
      ordersToday,
      totalProducts,
      topSellingParts,
      earningsPerMonth
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération des statistiques" });
  }
};

