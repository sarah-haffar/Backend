const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.get('/', controller.getAllShops);
router.post('/', controller.createUser);

// GET a single car brand by ID
router.get('/:id', controller.getShopsById);


// PUT update a car brand
router.put('/:id', controller.updateShops);

// DELETE a car brand
router.delete('/:id', controller.deleteShops);
module.exports = router;