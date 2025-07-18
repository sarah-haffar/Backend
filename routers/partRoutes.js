const express = require('express');
const router = express.Router();
const controller = require('../controllers/partController');

router.get('/', controller.getAllParts);
router.post('/', controller.createPart);

// GET a single car brand by ID
router.get('/:id', controller.getPartById);


// PUT update a car brand
router.put('/:id', controller.updatePart);

// DELETE a car brand
router.delete('/:id', controller.deletePart);

module.exports = router;