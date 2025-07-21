// middlewares/hasPermission.js
const db = require('../models');

module.exports = (requiredPermission) => {
  return async (req, res, next) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const foundUser = await db.User.findByPk(user.id, {
        include: [{ model: db.Role, as: 'role' }]
      });

      const permissions = foundUser?.role?.permissions || [];

      if (permissions.includes('*') || permissions.includes(requiredPermission)) {
        return next();
      }

      return res.status(403).json({ error: 'Forbidden: insufficient permissions' });
    } catch (err) {
      return res.status(500).json({ error: 'Server error' });
    }
  };
};
