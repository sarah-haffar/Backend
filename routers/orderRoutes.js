const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderController');

router.get('/', controller.getAllOrders);
router.post('/', controller.createOrder);

// GET a single car brand by ID
router.get('/:id', controller.getOrderById);


// PUT update a car brand
router.put('/:id', controller.updateOrder);

// DELETE a car brand
router.delete('/:id', controller.deleteOrder);

module.exports = router;