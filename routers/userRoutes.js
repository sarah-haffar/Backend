const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.get('/', controller.getAllUsers);

router.post('/', controller.createUser);

// GET a single car brand by ID
router.get('/:id', controller.getUsersById);


// PUT update a car brand
router.put('/:id', controller.updateUsers);

// DELETE a car brand
router.delete('/:id', controller.deleteUsers);
module.exports = router;