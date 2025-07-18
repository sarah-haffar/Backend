const express = require('express');
const router = express.Router();
const controller = require('../controllers/shopController');

router.get('/', controller.getAllShops);
router.post('/', controller.createShop);

// GET a single car brand by ID
router.get('/:id', controller.getShopById);


// PUT update a car brand
router.put('/:id', controller.updateShop);

// DELETE a car brand
router.delete('/:id', controller.deleteShop);
module.exports = router;