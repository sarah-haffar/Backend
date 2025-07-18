const express = require('express');
const router = express.Router();
const controller = require('../controllers/engineController');

router.get('/', controller.getAllEngines);
router.post('/', controller.createEngine);

// GET a single car brand by ID
router.get('/:id', controller.getEngineById);


// PUT update a car brand
router.put('/:id', controller.updateEngine);

// DELETE a car brand
router.delete('/:id', controller.deleteEngine);

module.exports = router;