// middlewares/isAdmin.js

function isAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: "Utilisateur non authentifié" });
  }
  if (req.user.role_name !== 'admin') {
    return res.status(403).json({ error: "Accès refusé : Admin uniquement" });
  }
  next();
}

module.exports = isAdmin;
