const db = require('../models');
const Role = db.Role;

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({
      include: [{ association: 'users' }]
    });
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id, {
      include: [{ association: 'users' }]
    });
    if (!role) return res.status(404).json({ message: 'Role not found' });
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createRole = async (req, res) => {
  try {
    const role = await Role.create({
      ...req.body,
      created_at: new Date()
    });
    res.status(201).json(role);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ message: 'Role not found' });

    await role.update(req.body);
    res.json(role);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ message: 'Role not found' });

    await role.destroy();
    res.json({ message: 'Role deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
