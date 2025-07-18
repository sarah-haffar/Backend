const express = require('express');
const router = express.Router();
const controller = require('../controllers/partCategoryController');

router.get('/', controller.getAllCategories);
router.post('/', controller.createCategory);

// GET a single car brand by ID
router.get('/:id', controller.getCategoryById);


// PUT update a car brand
router.put('/:id', controller.updateCategory);

// DELETE a car brand
router.delete('/:id', controller.deleteCategory);

module.exports = router;
