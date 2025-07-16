const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderItemController');

router.get('/', controller.getAllOrderItems);
router.post('/', controller.createOrderItem);

// GET a single car brand by ID
router.get('/:id', controller.getEnginesById);


// PUT update a car brand
router.put('/:id', controller.updateEngines);

// DELETE a car brand
router.delete('/:id', controller.deleteEngines);
module.exports = router;
