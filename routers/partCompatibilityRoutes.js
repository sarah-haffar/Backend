const express = require('express');
const router = express.Router();
const controller = require('../controllers/partCompatibilityController');

router.get('/', controller.getAllPartCompatibilities);
router.post('/', controller.createPartCompatibility);


// GET a single car brand by ID
router.get('/:id', controller.getPartCompatibilitiesById);


// PUT update a car brand
router.put('/:id', controller.updatePartCompatibilities);

// DELETE a car brand
router.delete('/:id', controller.deletePartCompatibilities);

module.exports = router;