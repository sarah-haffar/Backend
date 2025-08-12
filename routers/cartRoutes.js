const express = require('express');
const router = express.Router();
const controller = require('../controllers/cartController');

/**
 * @swagger
 * tags:
 *   name: Carts
 *   description: Cart management and operations
 */

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get all carts
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of carts
 */
router.get('/', controller.getAllCarts);

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Create a new cart
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - items
 *             properties:
 *               user_id:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Cart created successfully
 */
router.post('/', controller.createCart);

/**
 * @swagger
 * /api/cart/{id}:
 *   get:
 *     summary: Get cart by ID
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Cart ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart object
 *       404:
 *         description: Cart not found
 */
router.get('/:id', controller.getCartById);

/**
 * @swagger
 * /api/cart/{id}:
 *   put:
 *     summary: Update a cart by ID
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Cart ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *       404:
 *         description: Cart not found
 */
router.put('/:id', controller.updateCart);

/**
 * @swagger
 * /api/cart/{id}:
 *   delete:
 *     summary: Delete a cart by ID
 *     tags: [Carts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Cart ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cart deleted successfully
 *       404:
 *         description: Cart not found
 */
router.delete('/:id', controller.deleteCart);

module.exports = router;
