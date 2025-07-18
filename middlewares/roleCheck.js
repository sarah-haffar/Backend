module.exports = function requireRole(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role_name)) {
            return res.status(403).json({ error: "Accès refusé" });
        }
        next();
    };
};
const requireRole = require("../middlewares/requireRole");

// Only superAdmin can access
router.delete("/:id", requireRole("superAdmin"), controller.deleteUser);

// Admin or the same user can update user info
router.put("/:id", requireRole("admin", "superAdmin"), controller.updateUser);
