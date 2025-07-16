const express = require('express');
const router = express.Router();
const controller = require('../controllers/partCompatibilityController');

router.get('/', controller.getAllCompatibilities);
router.get('/:part_id/:engine_id', controller.getCompatibilityById);
router.post('/', controller.createCompatibility);
router.put('/:part_id/:engine_id', controller.updateCompatibility);
router.delete('/:part_id/:engine_id', controller.deleteCompatibility);

module.exports = router;
