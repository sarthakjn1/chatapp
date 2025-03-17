const express = require('express');
const AuthController = require('../controllers/authController');

const authController = new AuthController();

const router = express.Router();

router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));

module.exports = router;