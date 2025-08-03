const jwt = require("jsonwebtoken");
const db = require("../models");

module.exports = async function isAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token manquant ou invalide" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ On inclut les permissions via le rôle
    const user = await db.User.findByPk(decoded.id, {
      include: [
        {
          model: db.Role,
          as: "role",
          include: [{ model: db.Permission, as: "permissions" }]
        }
      ]
    });

    if (!user) {
      return res.status(401).json({ error: "Utilisateur introuvable" });
    }

    req.user = {
      id: user.id,
      role_id: user.role_id,
      role_name: user.role.name,
      email: user.email,
      permissions: user.role.permissions?.map(p => p.code) || []
    };

    next();

  } catch (error) {
    console.error("Erreur d'authentification :", error);
    return res.status(401).json({ error: "Token invalide ou expiré" });
  }
};
