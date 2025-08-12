const express = require('express');
const router = express.Router();
const controller = require('../controllers/carBrandController');
const hasPermission = require('../middlewares/hasPermission');

/**
 * @swagger
 * tags:
 *   name: CarBrands
 *   description: Car brand management and operations
 */

/**
 * @swagger
 * /api/carBrand:
 *   get:
 *     summary: Get all car brands
 *     tags: [CarBrands]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of car brands
 */
router.get('/', controller.getAllCarBrands);

/**
 * @swagger
 * /api/carBrand/{id}:
 *   get:
 *     summary: Get car brand by ID
 *     tags: [CarBrands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Car brand ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car brand object
 *       404:
 *         description: Car brand not found
 */
router.get('/:id', controller.getCarBrandById);

/**
 * @swagger
 * /api/carBrand:
 *   post:
 *     summary: Create a new car brand
 *     tags: [CarBrands]
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
 *               - country
 *             properties:
 *               name:
 *                 type: string
 *               country:
 *                 type: string
 *               founded:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Car brand created successfully
 */
router.post('/', hasPermission('MANAGE_CAR_BRANDS'), controller.createCarBrand);

/**
 * @swagger
 * /api/carBrand/{id}:
 *   put:
 *     summary: Update a car brand by ID
 *     tags: [CarBrands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Car brand ID
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
 *               country:
 *                 type: string
 *               founded:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Car brand updated successfully
 *       404:
 *         description: Car brand not found
 */
router.put('/:id', hasPermission('MANAGE_CAR_BRANDS'), controller.updateCarBrand);

/**
 * @swagger
 * /api/carBrand/{id}:
 *   delete:
 *     summary: Delete a car brand by ID
 *     tags: [CarBrands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Car brand ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car brand deleted successfully
 *       404:
 *         description: Car brand not found
 */
router.delete('/:id', hasPermission('MANAGE_CAR_BRANDS'), controller.deleteCarBrand);

module.exports = router;
