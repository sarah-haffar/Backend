// middlewares/validators/userValidator.js
const { body } = require('express-validator');

const createUserValidator = [
    body('email')
        .isEmail()
        .withMessage("Email invalide"),
    body('password')
        .isLength({ min: 6 })
        .withMessage("Le mot de passe doit contenir au moins 6 caractères"),
    body('role_id')
        .isInt()
        .withMessage("ID du rôle invalide"),
    body('first_name')
        .optional()
        .isString(),
    body('last_name')
        .optional()
        .isString(),
    body('phone')
        .optional()
        .isString(),
    body('address')
        .optional()
        .isString(),
    body('city')
        .optional()
        .isString(),
    body('postal_code')
        .optional()
        .isString(),
    body('country')
        .optional()
        .isString()
];

const updateUserValidator = [
    body('email')
        .optional()
        .isEmail()
        .withMessage("Email invalide"),
    body('password')
        .optional()
        .isLength({ min: 6 })
        .withMessage("Le mot de passe doit contenir au moins 6 caractères"),
    body('role_id')
        .optional()
        .isInt()
        .withMessage("ID du rôle invalide")
];

module.exports = {
    createUserValidator,
    updateUserValidator
};
