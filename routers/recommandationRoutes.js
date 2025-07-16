const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommandationController');

router.get('/', recommendationController.getAllRecommendations);
router.get('/:id', recommendationController.getRecommendationById);
router.post('/', recommendationController.createRecommendation);
router.put('/:id', recommendationController.updateRecommendation);
router.delete('/:id', recommendationController.deleteRecommendation);

module.exports = router;
