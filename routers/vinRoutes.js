const express = require('express');
const router = express.Router();
const { getVehicleInfo } = require('../controllers/vinController');

/**
 * @swagger
 * /api/vin/{vin}:
 *   get:
 *     summary: Décoder un VIN pour obtenir les infos moteur
 *     tags: [VIN]
 *     parameters:
 *       - in: path
 *         name: vin
 *         schema:
 *           type: string
 *         required: true
 *         description: Numéro de châssis (VIN) à 17 caractères
 *     responses:
 *       200:
 *         description: Informations du véhicule
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 vin:
 *                   type: string
 *                 make:
 *                   type: string
 *                 model:
 *                   type: string
 *                 year:
 *                   type: string
 *                 engine_model:
 *                   type: string
 *                 engine_cylinders:
 *                   type: string
 *                 fuel_type:
 *                   type: string
 *       400:
 *         description: VIN invalide
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/:vin', getVehicleInfo);

module.exports = router;
