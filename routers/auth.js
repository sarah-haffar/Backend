const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");


router.post("/register", authController.register);


// Email/password login
router.post("/login", authController.login);

// Google login with Firebase token
router.post("/google-login", authController.googleLogin);

module.exports = router;
