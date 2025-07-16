const express = require('express');
const router = express.Router();
const controller = require('../controllers/partCategoryController');

router.get('/', controller.getAllPartCategories);
router.post('/', controller.createPartCategory);

// GET a single car brand by ID
router.get('/:id', controller.getPartCategoriesById);


// PUT update a car brand
router.put('/:id', controller.updatePartCategories);

// DELETE a car brand
router.delete('/:id', controller.deletePartCategories);

module.exports = router;
