const express = require('express');
const router = express.Router();
const partCategoryController = require('../controllers/partCategoryController');

router.get('/', partCategoryController.getAllCategories);
router.get('/:id', partCategoryController.getCategoryById);
router.post('/', partCategoryController.createCategory);
router.put('/:id', partCategoryController.updateCategory);
router.delete('/:id', partCategoryController.deleteCategory);

module.exports = router;
