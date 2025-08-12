const express = require('express');
const router = express.Router();
const controller = require('../controllers/partController');
const isAuthenticated = require('../middlewares/isAuthenticated'); // 🔐

/**
 * @swagger
 * tags:
 *   name: Parts
 *   description: Parts management and operations
 */

/**
 * @swagger
 * /api/parts:
 *   get:
 *     summary: Get all parts (paginated)
 *     tags: [Parts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of parts with pagination
 */
router.get('/', controller.getAllParts);

/**
 * @swagger
 * /api/parts:
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
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Part created successfully
 */
router.post('/', isAuthenticated, controller.createPart);

/**
 * @swagger
 * /api/parts/{id}:
 *   get:
 *     summary: Get part by ID
 *     tags: [Parts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Part data
 *       404:
 *         description: Part not found
 */
router.get('/:id', controller.getPartById);

/**
 * @swagger
 * /api/parts/{id}:
 *   put:
 *     summary: Update a part
 *     tags: [Parts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Part updated
 *       404:
 *         description: Part not found
 */
router.put('/:id', isAuthenticated, controller.updatePart);

/**
 * @swagger
 * /api/parts/{id}:
 *   delete:
 *     summary: Delete a part
 *     tags: [Parts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Part deleted
 *       404:
 *         description: Part not found
 */
router.delete('/:id', isAuthenticated, controller.deletePart);

module.exports = router;
