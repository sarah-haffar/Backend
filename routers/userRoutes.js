const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.get('/', controller.getAllUsers);

router.post('/', controller.createUser);

// GET a single car brand by ID
router.get('/:id', controller.getUserById);


// PUT update a car brand
router.put('/:id', controller.updateUser);

// DELETE a car brand
router.delete('/:id', controller.deleteUser);
module.exports = router;