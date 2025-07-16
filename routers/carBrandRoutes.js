const express = require('express');
const router = express.Router();
const controller = require('../controllers/carBrandController');

// GET all car brands
router.get('/', controller.getAllCarBrands);

// GET a single car brand by ID
router.get('/:id', controller.getCarBrandById);

// POST a new car brand
router.post('/', controller.createCarBrand);

// PUT update a car brand
router.put('/:id', controller.updateCarBrand);

// DELETE a car brand
router.delete('/:id', controller.deleteCarBrand);

module.exports = router;
