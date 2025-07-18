const express = require('express');
const router = express.Router();
const controller = require('../controllers/roleController');

router.get('/', controller.getAllRoles);
router.post('/', controller.createRole);

// GET a single car brand by ID
router.get('/:id', controller.getRoleById);


// PUT update a car brand
router.put('/:id', controller.updateRole);

// DELETE a car brand
router.delete('/:id', controller.deleteRole);
module.exports = router;
