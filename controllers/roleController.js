const db = require('../models');
const Role = db.Role;

// Get all roles with associated users
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({
      include: [{ association: 'users', attributes: ['id', 'name', 'email'] }],
      order: [['id', 'ASC']]
    });
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get one role by ID
exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id, {
      include: [{ association: 'users', attributes: ['id', 'name', 'email'] }]
    });
    if (!role) return res.status(404).json({ message: 'Role not found' });
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new role
exports.createRole = async (req, res) => {
  try {
    const { name, description, permissions, is_active } = req.body;

    // Validate input (optional)
    if (!name) {
      return res.status(400).json({ message: "Role name is required" });
    }
    if (permissions && !Array.isArray(permissions)) {
      return res.status(400).json({ message: "Permissions must be an array" });
    }

    const role = await Role.create({
      name,
      description,
      permissions: permissions || [],
      is_active: is_active !== undefined ? is_active : true
    });
    res.status(201).json(role);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an existing role
exports.updateRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ message: 'Role not found' });

    // Optionally validate permissions if present in req.body
    if (req.body.permissions && !Array.isArray(req.body.permissions)) {
      return res.status(400).json({ message: "Permissions must be an array" });
    }

    await role.update(req.body);
    res.json(role);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a role
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
