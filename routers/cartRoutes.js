const express = require('express');
const router = express.Router();
const controller = require('../controllers/cartController');

router.get('/', controller.getAllCarts);
router.post('/', controller.createCart);


// GET a single car brand by ID
router.get('/:id', controller.getCartById);


// PUT update a car brand
router.put('/:id', controller.updateCart);

// DELETE a car brand
router.delete('/:id', controller.deleteCart);
module.exports = router;