const express = require('express');
const router = express.Router();
const controller = require('../controllers/carModelController');

/**
 * @swagger
 * tags:
 *   name: CarModels
 *   description: Car model management and operations
 */

/**
 * @swagger
 * /api/carModel:
 *   get:
 *     summary: Get all car models
 *     tags: [CarModels]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of car models
 */
router.get('/', controller.getAllCarModels);

/**
 * @swagger
 * /api/carModel:
 *   post:
 *     summary: Create a new car model
 *     tags: [CarModels]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - manufacturer
 *             properties:
 *               name:
 *                 type: string
 *               manufacturer:
 *                 type: string
 *               year:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Car model created successfully
 */
router.post('/', controller.createCarModel);

/**
 * @swagger
 * /api/carModel/{id}:
 *   get:
 *     summary: Get car model by ID
 *     tags: [CarModels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Car model ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car model object
 *       404:
 *         description: Car model not found
 */
router.get('/:id', controller.getCarModelById);

/**
 * @swagger
 * /api/carModel/{id}:
 *   put:
 *     summary: Update a car model by ID
 *     tags: [CarModels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Car model ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               manufacturer:
 *                 type: string
 *               year:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Car model updated successfully
 *       404:
 *         description: Car model not found
 */
router.put('/:id', controller.updateCarModel);

/**
 * @swagger
 * /api/carModel/{id}:
 *   delete:
 *     summary: Delete a car model by ID
 *     tags: [CarModels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Car model ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car model deleted successfully
 *       404:
 *         description: Car model not found
 */
router.delete('/:id', controller.deleteCarModel);

module.exports = router;