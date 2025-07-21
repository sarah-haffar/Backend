const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderItemController');

/**
 * @swagger
 * tags:
 *   name: OrderItems
 *   description: Order item management and operations
 */

/**
 * @swagger
 * /api/orderItem:
 *   get:
 *     summary: Get all order items
 *     tags: [OrderItems]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of order items
 */
router.get('/', controller.getAllOrderItems);

/**
 * @swagger
 * /api/orderItem:
 *   post:
 *     summary: Create a new order item
 *     tags: [OrderItems]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - productId
 *               - quantity
 *             properties:
 *               orderId:
 *                 type: string
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Order item created successfully
 */
router.post('/', controller.createOrderItem);

/**
 * @swagger
 * /api/orderItem/{id}:
 *   get:
 *     summary: Get order item by ID
 *     tags: [OrderItems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Order item ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order item object
 *       404:
 *         description: Order item not found
 */
router.get('/:id', controller.getOrderItemById);

/**
 * @swagger
 * /api/orderItem/{id}:
 *   put:
 *     summary: Update an order item by ID
 *     tags: [OrderItems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Order item ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Order item updated successfully
 *       404:
 *         description: Order item not found
 */
router.put('/:id', controller.updateOrderItem);

/**
 * @swagger
 * /api/orderItem/{id}:
 *   delete:
 *     summary: Delete an order item by ID
 *     tags: [OrderItems]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Order item ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order item deleted successfully
 *       404:
 *         description: Order item not found
 */
router.delete('/:id', controller.deleteOrderItem);

module.exports = router;