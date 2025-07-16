const express = require('express');
const router = express.Router();
const controller = require('../controllers/partController');

router.get('/', controller.getAllParts);
router.post('/', controller.createPart);

// GET a single car brand by ID
router.get('/:id', controller.getPartsById);


// PUT update a car brand
router.put('/:id', controller.updateParts);

// DELETE a car brand
router.delete('/:id', controller.deleteParts);

module.exports = router;