const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderItemController');

router.get('/', controller.getAllOrderItems);
router.post('/', controller.createOrderItem);

// GET a single car brand by ID
router.get('/:id', controller.getOrderItemById);


// PUT update a car brand
router.put('/:id', controller.updateOrderItem);

// DELETE a car brand
router.delete('/:id', controller.deleteOrderItem);
module.exports = router;
