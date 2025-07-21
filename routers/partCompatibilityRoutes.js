const express = require('express');
const router = express.Router();
const controller = require('../controllers/partCompatibilityController');

/**
 * @swagger
 * tags:
 *   name: PartCompatibilities
 *   description: Part compatibility management and operations
 */

/**
 * @swagger
 * /api/partCompatibility:
 *   get:
 *     summary: Get all part compatibilities
 *     tags: [PartCompatibilities]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of part compatibilities
 */
router.get('/', controller.getAllPartCompatibilities);

/**
 * @swagger
 * /api/partCompatibility:
 *   post:
 *     summary: Create a new part compatibility
 *     tags: [PartCompatibilities]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - partId
 *               - compatibleWithId
 *             properties:
 *               partId:
 *                 type: string
 *               compatibleWithId:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Part compatibility created successfully
 */
router.post('/', controller.createPartCompatibility);

/**
 * @swagger
 * /api/partCompatibility/{id}:
 *   get:
 *     summary: Get part compatibility by ID
 *     tags: [PartCompatibilities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Part compatibility ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Part compatibility object
 *       404:
 *         description: Part compatibility not found
 */
router.get('/:id', controller.getPartCompatibilitieById);

/**
 * @swagger
 * /api/partCompatibility/{id}:
 *   put:
 *     summary: Update a part compatibility by ID
 *     tags: [PartCompatibilities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Part compatibility ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               partId:
 *                 type: string
 *               compatibleWithId:
 *                 type: string
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Part compatibility updated successfully
 *       404:
 *         description: Part compatibility not found
 */
router.put('/:id', controller.updatePartCompatibilitie);

/**
 * @swagger
 * /api/partCompatibility/{id}:
 *   delete:
 *     summary: Delete a part compatibility by ID
 *     tags: [PartCompatibilities]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Part compatibility ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Part compatibility deleted successfully
 *       404:
 *         description: Part compatibility not found
 */
router.delete('/:id', controller.deletePartCompatibilitie);

module.exports = router;
