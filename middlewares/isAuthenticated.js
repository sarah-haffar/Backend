const jwt = require("jsonwebtoken");
const db = require("../models");

module.exports = async function isAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization;


    console.log("Authorization Header:", req.headers.authorization);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token manquant ou invalide" });
    }

    const token = authHeader.split(" ")[1];

    try {
        // Vérifier et décoder le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Récupérer l'utilisateur en base avec son rôle
        const user = await db.User.findByPk(decoded.id, {
            include: [{ model: db.Role, as: "role" }]
        });

        if (!user) {
            return res.status(401).json({ error: "Utilisateur introuvable" });
        }

        // Injecter dans req.user uniquement les infos utiles
        req.user = {
            id: decoded.id,
            email: decoded.email,
            first_name: decoded.first_name,
            role_id: decoded.role_id
        };


        next();

    } catch (error) {
        return res.status(401).json({ error: "Token invalide ou expiré" });


    }
};
