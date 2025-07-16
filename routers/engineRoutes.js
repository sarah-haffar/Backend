const express = require('express');
const router = express.Router();
const controller = require('../controllers/engineController');

router.get('/', controller.getAllEngines);
router.post('/', controller.createEngine);

// GET a single engine by ID
router.get('/:id', controller.getEngineById);   // ✅ nom corrigé

// PUT update an engine
router.put('/:id', controller.updateEngine);    // ✅ nom corrigé

// DELETE an engine
router.delete('/:id', controller.deleteEngine); // ✅ nom corrigé

module.exports = router;
