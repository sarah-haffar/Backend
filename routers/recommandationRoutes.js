const express = require('express');
const router = express.Router();
const controller = require('../controllers/recommandationController');

router.get('/', controller.getAllRecommandations);
router.post('/', controller.createRecommandation);


// GET a single car brand by ID
router.get('/:id', controller.getRecommandationsById);


// PUT update a car brand
router.put('/:id', controller.updateRecommandations);

// DELETE a car brand
router.delete('/:id', controller.deleteRecommandations);
module.exports = router;
