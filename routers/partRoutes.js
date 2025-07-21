const express = require('express');
const router = express.Router();
const controller = require('../controllers/partController');

/**
 * @swagger
 * tags:
 *   name: Parts
 *   description: Parts management and operations
 */

/**
 * @swagger
 * /api/partCategory:
 *   get:
 *     summary: Get all parts
 *     tags: [Parts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of parts
 */
router.get('/', controller.getAllParts);

/**
 * @swagger
 * /api/partCategory:
 *   post:
 *     summary: Create a new part
 *     tags: [Parts]
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
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Part created successfully
 */
router.post('/', controller.createPart);

/**
 * @swagger
 * /api/partCategory/{id}:
 *   get:
 *     summary: Get part by ID
 *     tags: [Parts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Part ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Part object
 *       404:
 *         description: Part not found
 */
router.get('/:id', controller.getPartById);

/**
 * @swagger
 * /api/partCategory/{id}:
 *   put:
 *     summary: Update a part by ID
 *     tags: [Parts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Part ID
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
 *               price:
 *                 type: number
 *                 format: float
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Part updated successfully
 *       404:
 *         description: Part not found
 */
router.put('/:id', controller.updatePart);

/**
 * @swagger
 * /api/partCategory/{id}:
 *   delete:
 *     summary: Delete a part by ID
 *     tags: [Parts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Part ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Part deleted successfully
 *       404:
 *         description: Part not found
 */
router.delete('/:id', controller.deletePart);

module.exports = router;