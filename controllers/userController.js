const db = require('../models');
const User = db.User;

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        { association: 'role' },
        { association: 'orders' },
        { association: 'cart' },
        { association: 'reviews' },
        { association: 'recommendations' },
        { association: 'shops' },
        { association: 'cars' }
      ],
      order: [['created_at', 'DESC']]
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [
        { association: 'role' },
        { association: 'orders' },
        { association: 'cart' },
        { association: 'reviews' },
        { association: 'recommendations' },
        { association: 'shops' },
        { association: 'cars' }
      ]
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.update(req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};