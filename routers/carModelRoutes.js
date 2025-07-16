// routes/carModelRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/carModelController');

router.get('/', controller.getAllCarModels);
router.post('/', controller.createCarModel);

// GET a single car brand by ID
router.get('/:id', controller.getCarModelById);


// PUT update a car brand
router.put('/:id', controller.updateCarModel);

// DELETE a car brand
router.delete('/:id', controller.deleteCarModel);


module.exports = router;