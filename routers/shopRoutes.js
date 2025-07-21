const express = require('express');
const router = express.Router();
const controller = require('../controllers/shopController');

/**
 * @swagger
 * tags:
 *   name: Shops
 *   description: Shop management and operations
 */

/**
 * @swagger
 * /api/shop:
 *   get:
 *     summary: Get all shops
 *     tags: [Shops]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of shops
 */
router.get('/', controller.getAllShops);

/**
 * @swagger
 * /api/shop:
 *   post:
 *     summary: Create a new shop
 *     tags: [Shops]
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
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Shop created successfully
 */
router.post('/', controller.createShop);

/**
 * @swagger
 * /api/shop/{id}:
 *   get:
 *     summary: Get shop by ID
 *     tags: [Shops]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Shop ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Shop object
 *       404:
 *         description: Shop not found
 */
router.get('/:id', controller.getShopById);

/**
 * @swagger
 * /api/shop/{id}:
 *   put:
 *     summary: Update a shop by ID
 *     tags: [Shops]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Shop ID
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
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Shop updated successfully
 *       404:
 *         description: Shop not found
 */
router.put('/:id', controller.updateShop);

/**
 * @swagger
 * /api/shop/{id}:
 *   delete:
 *     summary: Delete a shop by ID
 *     tags: [Shops]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Shop ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Shop deleted successfully
 *       404:
 *         description: Shop not found
 */
router.delete('/:id', controller.deleteShop);

module.exports = router;
