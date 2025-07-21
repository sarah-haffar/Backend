const express = require('express');
const router = express.Router();
const controller = require('../controllers/recommandationController');

/**
 * @swagger
 * tags:
 *   name: Recommandations
 *   description: Recommandation management and operations
 */

/**
 * @swagger
 * /api/recommandations:
 *   get:
 *     summary: Get all recommandations
 *     tags: [Recommandations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of recommandations
 */
router.get('/', controller.getAllRecommandations);

/**
 * @swagger
 * /api/recommandations:
 *   post:
 *     summary: Create a new recommandation
 *     tags: [Recommandations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Recommandation created successfully
 */
router.post('/', controller.createRecommandation);

/**
 * @swagger
 * /api/recommandations/{id}:
 *   get:
 *     summary: Get recommandation by ID
 *     tags: [Recommandations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Recommandation ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recommandation object
 *       404:
 *         description: Recommandation not found
 */
router.get('/:id', controller.getRecommandationById);

/**
 * @swagger
 * /api/recommandations/{id}:
 *   put:
 *     summary: Update a recommandation by ID
 *     tags: [Recommandations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Recommandation ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Recommandation updated successfully
 *       404:
 *         description: Recommandation not found
 */
router.put('/:id', controller.updateRecommandation);

/**
 * @swagger
 * /api/recommandations/{id}:
 *   delete:
 *     summary: Delete a recommandation by ID
 *     tags: [Recommandations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Recommandation ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recommandation deleted successfully
 *       404:
 *         description: Recommandation not found
 */
router.delete('/:id', controller.deleteRecommandation);

module.exports = router;
