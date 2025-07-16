const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderController');

router.get('/', controller.getAllOrders);
router.post('/', controller.createOrder);

// GET a single car brand by ID
router.get('/:id', controller.getOrdersById);


// PUT update a car brand
router.put('/:id', controller.updateOrders);

// DELETE a car brand
router.delete('/:id', controller.deleteOrders);

module.exports = router;