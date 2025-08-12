const db = require('../../models');
const Role = db.Role;
const Permission = db.Permission;

// Récupérer tous les rôles avec utilisateurs et permissions
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({
      include: [
        { association: 'users', attributes: ['id', 'first_name', 'last_name', 'email'] },
        { association: 'permissions' }
      ],
      order: [['id', 'ASC']]
    });
    res.json(roles);
  } catch (error) {
    console.error("Erreur getAllRoles:", error);
    res.status(500).json({ error: error.message });
  }
};

// Récupérer un rôle par son ID avec utilisateurs et permissions
exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id, {
      include: [
        { association: 'users', attributes: ['id', 'first_name', 'last_name', 'email'] },
        { association: 'permissions' }
      ]
    });
    if (!role) return res.status(404).json({ message: 'Role not found' });
    res.json(role);
  } catch (error) {
    console.error("Erreur getRoleById:", error);
    res.status(500).json({ error: error.message });
  }
};

// Créer un nouveau rôle avec ses permissions (optionnel)
exports.createRole = async (req, res) => {
  try {
    const { name, description, permissions, is_active } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Role name is required" });
    }

    if (permissions && !Array.isArray(permissions)) {
      return res.status(400).json({ message: "Permissions must be an array" });
    }

    const role = await Role.create({
      name,
      description,
      is_active: is_active !== undefined ? is_active : true
    });

    if (permissions && permissions.length > 0) {
      const foundPermissions = await Permission.findAll({
        where: { code: permissions }
      });

      if (foundPermissions.length !== permissions.length) {
        return res.status(400).json({ message: 'Some permissions provided are invalid' });
      }

      await role.setPermissions(foundPermissions);
    }

    const roleWithPermissions = await Role.findByPk(role.id, {
      include: [{ association: 'permissions' }]
    });

    res.status(201).json(roleWithPermissions);
  } catch (error) {
    console.error("Erreur createRole:", error);
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un rôle et ses permissions
exports.updateRole = async (req, res) => {
  try {
    const { name, description, is_active, permissions } = req.body;

    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ message: 'Role not found' });

    await role.update({ name, description, is_active });

    if (permissions !== undefined) {
      if (!Array.isArray(permissions)) {
        return res.status(400).json({ message: "Permissions must be an array" });
      }

      const foundPermissions = await Permission.findAll({
        where: { code: permissions }
      });

      if (foundPermissions.length !== permissions.length) {
        return res.status(400).json({ message: 'Some permissions provided are invalid' });
      }

      await role.setPermissions(foundPermissions);
    }

    const updatedRole = await Role.findByPk(role.id, {
      include: [{ association: 'permissions' }]
    });

    res.json(updatedRole);
  } catch (error) {
    console.error("Erreur updateRole:", error);
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un rôle
exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ message: 'Role not found' });

    await role.destroy();
    res.json({ message: 'Role deleted' });
  } catch (error) {
    console.error("Erreur deleteRole:", error);
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour uniquement les permissions d’un rôle (route PUT /api/admin/roles/:roleId/permissions)
exports.updateRolePermissions = async (req, res) => {
  const { roleId } = req.params;
  const { permissions } = req.body;

  try {
    if (!Array.isArray(permissions)) {
      return res.status(400).json({ error: 'permissions must be an array' });
    }

    const role = await Role.findByPk(roleId);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }

    const foundPermissions = await Permission.findAll({
      where: { code: permissions }
    });

    if (foundPermissions.length !== permissions.length) {
      return res.status(400).json({ error: 'Some permissions provided are invalid' });
    }

    await role.setPermissions(foundPermissions);

    const updatedRole = await Role.findByPk(roleId, {
      include: [{ association: 'permissions' }]
    });

    return res.status(200).json(updatedRole);
  } catch (error) {
    console.error("Erreur updateRolePermissions:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
