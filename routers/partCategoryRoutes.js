const express = require('express');
const router = express.Router();
const controller = require('../controllers/partCategoryController');

/**
 * @swagger
 * tags:
 *   name: Part Categories
 *   description: Part category operations
 */

/**
 * @swagger
 * /api/part-categories:
 *   get:
 *     summary: Get all part categories
 *     tags: [Part Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get('/', controller.getAllCategories);

/**
 * @swagger
 * /api/part-categories:
 *   post:
 *     summary: Create a new part category
 *     tags: [Part Categories]
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
 *               parent_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created
 */
router.post('/', controller.createCategory);

/**
 * @swagger
 * /api/part-categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Part Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category data
 *       404:
 *         description: Not found
 */
router.get('/:id', controller.getCategoryById);

/**
 * @swagger
 * /api/part-categories/{id}:
 *   put:
 *     summary: Update a category
 *     tags: [Part Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
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
 *               parent_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated
 *       404:
 *         description: Not found
 */
router.put('/:id', controller.updateCategory);

/**
 * @swagger
 * /api/part-categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Part Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted
 *       404:
 *         description: Not found
 */
router.delete('/:id', controller.deleteCategory);

module.exports = router;
