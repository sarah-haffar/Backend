const express = require("express");
const router = express.Router();
const db = require("../models");

// GET /roles — récupérer tous les rôles
router.get("/roles", async (req, res) => {
    try {
        const roles = await db.Role.findAll({
            include: [{ model: db.User, as: 'users' }]
        });
        res.status(200).json(roles);
    } catch (error) {
        console.error("Erreur récupération rôles :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des rôles" });
    }
});

// GET /roles/:id — récupérer un rôle spécifique
router.get("/roles/:id", async (req, res) => {
    try {
        const role = await db.Role.findByPk(req.params.id, {
            include: [{ model: db.User, as: 'users' }]
        });

        if (!role) return res.status(404).json({ error: "Rôle non trouvé" });

        res.status(200).json(role);
    } catch (error) {
        console.error("Erreur récupération rôle :", error);
        res.status(500).json({ error: "Erreur lors de la récupération du rôle" });
    }
});

// POST /roles — créer un rôle
router.post("/createroles", async (req, res) => {
    try {
        const { name } = req.body;

        const existing = await db.Role.findOne({ where: { name } });
        if (existing) return res.status(400).json({ error: "Ce rôle existe déjà" });

        const newRole = await db.Role.create({
            name,
            created_at: new Date()
        });

        res.status(201).json({ message: "Rôle créé", role: newRole });
    } catch (error) {
        console.error("Erreur création rôle :", error);
        res.status(500).json({ error: "Erreur lors de la création du rôle" });
    }
});

// PUT /roles/:id — mettre à jour un rôle
router.put("/modifieroles/:id", async (req, res) => {
    try {
        const role = await db.Role.findByPk(req.params.id);
        if (!role) return res.status(404).json({ error: "Rôle non trouvé" });

        await role.update(req.body);

        res.status(200).json({ message: "Rôle mis à jour", role });
    } catch (error) {
        console.error("Erreur mise à jour rôle :", error);
        res.status(500).json({ error: "Erreur lors de la mise à jour du rôle" });
    }
});

// DELETE /roles/:id — supprimer un rôle
router.delete("/supprimeroles/:id", async (req, res) => {
    try {
        const role = await db.Role.findByPk(req.params.id);
        if (!role) return res.status(404).json({ error: "Rôle non trouvé" });

        await role.destroy();

        res.status(200).json({ message: "Rôle supprimé" });
    } catch (error) {
        console.error("Erreur suppression rôle :", error);
        res.status(500).json({ error: "Erreur lors de la suppression du rôle" });
    }
});

module.exports = router;
