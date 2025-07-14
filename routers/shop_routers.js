const express = require("express");
const router = express.Router();
const db = require("../models");

// GET /shops — liste de toutes les boutiques
router.get("/shops", async (req, res) => {
    try {
        const shops = await db.Shop.findAll({
            include: [{ model: db.User, as: "owner" }]
        });
        res.status(200).json(shops);
    } catch (error) {
        console.error("Erreur récupération shops :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des shops" });
    }
});

// GET /shops/:id — détails d'une boutique
router.get("/shops/:id", async (req, res) => {
    try {
        const shop = await db.Shop.findByPk(req.params.id, {
            include: [{ model: db.User, as: "owner" }]
        });
        if (!shop) return res.status(404).json({ error: "Boutique non trouvée" });
        res.status(200).json(shop);
    } catch (error) {
        console.error("Erreur récupération shop :", error);
        res.status(500).json({ error: "Erreur lors de la récupération de la boutique" });
    }
});

// POST /shops — créer une boutique
router.post("/shops", async (req, res) => {
    try {
        const {
            owner_id,
            name,
            description,
            address,
            city,
            postal_code,
            country,
            phone,
            email,
            website
        } = req.body;

        const newShop = await db.Shop.create({
            owner_id,
            name,
            description,
            address,
            city,
            postal_code,
            country,
            phone,
            email,
            website,
            created_at: new Date(),
            updated_at: new Date()
        });

        res.status(201).json({ message: "Boutique créée", shop: newShop });
    } catch (error) {
        console.error("Erreur création boutique :", error);
        res.status(500).json({ error: "Erreur lors de la création de la boutique" });
    }
});

// PUT /shops/:id — mettre à jour une boutique
router.put("/shops/:id", async (req, res) => {
    try {
        const shop = await db.Shop.findByPk(req.params.id);
        if (!shop) return res.status(404).json({ error: "Boutique non trouvée" });

        await shop.update({ ...req.body, updated_at: new Date() });

        res.status(200).json({ message: "Boutique mise à jour", shop });
    } catch (error) {
        console.error("Erreur mise à jour boutique :", error);
        res.status(500).json({ error: "Erreur lors de la mise à jour de la boutique" });
    }
});

// DELETE /shops/:id — supprimer une boutique
router.delete("/shops/:id", async (req, res) => {
    try {
        const shop = await db.Shop.findByPk(req.params.id);
        if (!shop) return res.status(404).json({ error: "Boutique non trouvée" });

        await shop.destroy();
        res.status(200).json({ message: "Boutique supprimée" });
    } catch (error) {
        console.error("Erreur suppression boutique :", error);
        res.status(500).json({ error: "Erreur lors de la suppression de la boutique" });
    }
});

module.exports = router;
