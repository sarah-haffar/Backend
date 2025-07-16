const express = require('express');
const router = express.Router();
const controller = require('../controllers/engineController');

router.get('/', controller.getAllEngines);
router.post('/', controller.createEngine);

// GET a single car brand by ID
router.get('/:id', controller.getEnginesById);


// PUT update a car brand
router.put('/:id', controller.updateEngines);

// DELETE a car brand
router.delete('/:id', controller.deleteEngines);

module.exports = router;