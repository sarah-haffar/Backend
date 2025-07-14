const express = require("express");
const route = express.Router();
const db = require("../models");
const bcrypt = require("bcrypt"); // pour hasher le mot de passe
const requireRole = require("../middlewares/requireRole");
const isAuthenticated = require("../middlewares/isAuthenticated");

const { createUserValidator, updateUserValidator } = require("../middlewares/validators/userValidator");
const validate = require("../middlewares/validate");

route.post('/createuser',createUserValidator, validate, requireRole(['super_admin']), async (req, res) => {
    try {
        const {
            email,
            password,
            role_id,
            first_name,
            last_name,
            phone,
            address,
            city,
            postal_code,
            country
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10); // hash du mot de passe
        const existingUser = await db.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Un utilisateur avec cet email existe déjà" });
        }

        const newUser = await db.User.create({
            email,
            password_hash: hashedPassword,
            role_id,
            first_name,
            last_name,
            phone,
            address,
            city,
            postal_code,
            country
        });

        res.status(201).json({ message: "Utilisateur créé avec succès", user: newUser });
    } catch (error) {
        console.error("Erreur création utilisateur :", error.message);
        res.status(500).json({ error: error.message });
    }
    
});
route.get('/users',updateUserValidator, validate, async (req, res) => {
    try {
        const users = await db.User.findAll({
            include: ['role', 'orders', 'cart', 'reviews', 'recommendations', 'shops']
        });

        // Supprimer les mots de passe hashés avant envoi
        const sanitizedUsers = users.map(user => {
            const u = user.toJSON();
            delete u.password_hash;
            return u;
        });

        res.status(200).json(sanitizedUsers);
    } catch (error) {
        console.error("Erreur récupération utilisateurs :", error);
        res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs" });
    }
});

route.get('/users/:id', async (req, res) => {
    try {
        const user = await db.User.findByPk(req.params.id, {
            include: ['role', 'orders', 'cart', 'reviews', 'recommendations', 'shops']
        });

        if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

        const userData = user.toJSON();
        delete userData.password_hash;

        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération de l'utilisateur" });
    }
});


route.put('/users/:id', async (req, res) => {
    try {
        const user = await db.User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

        const updatedData = { ...req.body };

        // Si on veut modifier le mot de passe, il faut le re-hasher
        if (req.body.password && req.body.password.trim() !== "") {
            updatedData.password_hash = await bcrypt.hash(req.body.password, 10);
        }
        delete updatedData.password; // pour éviter de l'envoyer à Sequelize (champ inexistant)
        
        await user.update(updatedData);

        const updatedUser = user.toJSON();
        delete updatedUser.password_hash;

        res.status(200).json({ message: "Utilisateur mis à jour", user });
    } catch (error) {
        console.error("Erreur mise à jour utilisateur :", error);
        res.status(500).json({ error: "Erreur lors de la mise à jour de l'utilisateur" });
    }
});
route.delete('/users/:id', async (req, res) => {
    try {
        const user = await db.User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

        await user.destroy();
        res.status(200).json({ message: "Utilisateur supprimé" });
    } catch (error) {
        console.error("Erreur suppression utilisateur :", error);
        res.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur" });
    }
});

module.exports = route;

