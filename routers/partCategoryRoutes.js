const express = require('express');
const router = express.Router();
const controller = require('../controllers/partCategoryController');

/**
 * @swagger
 * tags:
 *   name: PartCategories
 *   description: Part category management and operations
 */

/**
 * @swagger
 * /api/partCategory:
 *   get:
 *     summary: Get all part categories
 *     tags: [PartCategories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of part categories
 */
router.get('/', controller.getAllCategories);

/**
 * @swagger
 * /api/partCategory:
 *   post:
 *     summary: Create a new part category
 *     tags: [PartCategories]
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
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Part category created successfully
 */
router.post('/', controller.createCategory);

/**
 * @swagger
 * /api/partCategory/{id}:
 *   get:
 *     summary: Get part category by ID
 *     tags: [PartCategories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Part category ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Part category object
 *       404:
 *         description: Part category not found
 */
router.get('/:id', controller.getCategoryById);

/**
 * @swagger
 * /api/partCategory/{id}:
 *   put:
 *     summary: Update a part category by ID
 *     tags: [PartCategories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Part category ID
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
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Part category updated successfully
 *       404:
 *         description: Part category not found
 */
router.put('/:id', controller.updateCategory);

/**
 * @swagger
 * /api/partCategory/{id}:
 *   delete:
 *     summary: Delete a part category by ID
 *     tags: [PartCategories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Part category ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Part category deleted successfully
 *       404:
 *         description: Part category not found
 */
router.delete('/:id', controller.deleteCategory);

module.exports = router;
