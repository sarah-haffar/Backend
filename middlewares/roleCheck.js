module.exports = function requireRole(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role_name)) {
            return res.status(403).json({ error: "Accès refusé" });
        }
        next();
    };
};
