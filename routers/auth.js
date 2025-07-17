const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Email/password login
router.post("/login", authController.login);

// Google login with Firebase token
router.post("/google-login", authController.googleLogin);

module.exports = router;
