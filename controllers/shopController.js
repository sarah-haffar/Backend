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

exports.register = async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  try {
    const existingUser = await AuthService.findUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    const newUser = await AuthService.createUser({
      email,
      password,
      first_name,
      last_name,
      role_id: 2, // default user role
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      token,
      user: AuthService.formatUserResponse(newUser),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
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