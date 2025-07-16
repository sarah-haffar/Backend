const express = require('express');
const router = express.Router();
const controller = require('../controllers/reviewController');

router.get('/', controller.getAllReviews);
router.post('/', controller.createReview);


// GET a single car brand by ID
router.get('/:id', controller.getReviewsById);


// PUT update a car brand
router.put('/:id', controller.updateReviews);

// DELETE a car brand
router.delete('/:id', controller.deleteReviews);
module.exports = router;