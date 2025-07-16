// controllers/shopController.js
const Shop = db.Shop;

exports.getAllShops = async (req, res) => {
  try {
    const shops = await Shop.findAll();
    res.json(shops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createShop = async (req, res) => {
  try {
    const shop = await Shop.create(req.body);
    res.status(201).json(shop);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};