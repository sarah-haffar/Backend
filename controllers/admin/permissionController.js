const db = require('../../models');

exports.getAllPermissions = async (req, res) => {
  try {
    const permissions = await db.Permission.findAll();
    res.json(permissions);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.createPermission = async (req, res) => {
  try {
    const { code, description } = req.body;
    const permission = await db.Permission.create({ code, description });
    res.status(201).json(permission);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la création' });
  }
};
