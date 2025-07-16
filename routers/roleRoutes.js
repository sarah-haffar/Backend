const express = require('express');
const router = express.Router();
const controller = require('../controllers/roleController');

router.get('/', controller.getAllRoles);
router.post('/', controller.createRole);

// GET a single car brand by ID
router.get('/:id', controller.getRolesById);


// PUT update a car brand
router.put('/:id', controller.updateRoles);

// DELETE a car brand
router.delete('/:id', controller.deleteRoles);
module.exports = router;
