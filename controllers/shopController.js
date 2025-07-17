const db = require('../models');
const Shop = db.Shop;

exports.getAllShops = async (req, res) => {
  try {
    const shops = await Shop.findAll({
      include: [
        { association: 'owner' },
        { association: 'parts' }
      ],
      order: [['created_at', 'DESC']]
    });
    res.json(shops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getShopById = async (req, res) => {
  try {
    const shop = await Shop.findByPk(req.params.id, {
      include: [
        { association: 'owner' },
        { association: 'parts' }
      ]
    });
    if (!shop) return res.status(404).json({ message: 'Shop not found' });
    res.json(shop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createShop = async (req, res) => {
  try {
    const shop = await Shop.create({
      ...req.body,
      created_at: new Date(),
      updated_at: new Date()
    });
    res.status(201).json(shop);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateShop = async (req, res) => {
  try {
    const shop = await Shop.findByPk(req.params.id);
    if (!shop) return res.status(404).json({ message: 'Shop not found' });

    await shop.update({
      ...req.body,
      updated_at: new Date()
    });
    res.json(shop);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteShop = async (req, res) => {
  try {
    const shop = await Shop.findByPk(req.params.id);
    if (!shop) return res.status(404).json({ message: 'Shop not found' });

    await shop.destroy();
    res.json({ message: 'Shop deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};