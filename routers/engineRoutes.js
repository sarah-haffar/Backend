const express = require('express');
const router = express.Router();
const controller = require('../controllers/engineController');

/**
 * @swagger
 * tags:
 *   name: Engines
 *   description: Engine management and operations
 */

/**
 * @swagger
 * /api/engine:
 *   get:
 *     summary: Get all engines
 *     tags: [Engines]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of engines
 */
router.get('/', controller.getAllEngines);

/**
 * @swagger
 * /api/engine:
 *   post:
 *     summary: Create a new engine
 *     tags: [Engines]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - model
 *               - horsepower
 *             properties:
 *               model:
 *                 type: string
 *               horsepower:
 *                 type: integer
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Engine created successfully
 */
router.post('/', controller.createEngine);

/**
 * @swagger
 * /api/engine/{id}:
 *   get:
 *     summary: Get engine by ID
 *     tags: [Engines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Engine ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Engine object
 *       404:
 *         description: Engine not found
 */
router.get('/:id', controller.getEngineById);

/**
 * @swagger
 * /api/engine/{id}:
 *   put:
 *     summary: Update an engine by ID
 *     tags: [Engines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Engine ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               model:
 *                 type: string
 *               horsepower:
 *                 type: integer
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Engine updated successfully
 *       404:
 *         description: Engine not found
 */
router.put('/:id', controller.updateEngine);

/**
 * @swagger
 * /api/engine/{id}:
 *   delete:
 *     summary: Delete an engine by ID
 *     tags: [Engines]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Engine ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Engine deleted successfully
 *       404:
 *         description: Engine not found
 */
router.delete('/:id', controller.deleteEngine);

module.exports = router;
