// middlewares/requireRole.js
module.exports = function requireRole(allowedRoles, allowSameUser = false) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: "Utilisateur non authentifié" });
        }

        // Vérifie si le rôle est dans les autorisés
        if (allowedRoles.includes(req.user.role_name)) {
            return next();
        }

        // Autorise si c'est son propre id (ex: modification de son propre compte)
        if (allowSameUser && req.user.id === parseInt(req.params.id)) {
            return next();
        }

        return res.status(403).json({ error: "Accès refusé : rôle insuffisant" });
    };
};
