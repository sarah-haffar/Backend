const db = require('../models');

module.exports = (requiredPermission) => {
  if (!requiredPermission) throw new Error("Missing requiredPermission argument in hasPermission middleware");

  return async (req, res, next) => {
    const user = req.user;
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    try {
      const foundUser = await db.User.findByPk(user.id, {
        include: [{
          model: db.Role,
          as: 'role',
          include: [{ model: db.Permission, as: 'permissions' }]
        }]
      });

      if (!foundUser || !foundUser.role || !foundUser.role.permissions) {
        return res.status(403).json({ error: 'Forbidden: role or permissions not found' });
      }

      const userPermissions = foundUser.role.permissions.map(p => p.code);

      if (userPermissions.includes('*') || userPermissions.includes(requiredPermission)) {
        return next();
      }

      return res.status(403).json({ error: `Forbidden: missing permission ${requiredPermission}` });

    } catch (err) {
      console.error("hasPermission error:", err);
      return res.status(500).json({ error: 'Server error' });
    }
  };
};
