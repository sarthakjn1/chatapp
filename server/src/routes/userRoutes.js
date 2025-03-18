const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();
const userController = new UserController();

// Get all users except the logged-in user
router.get('/', userController.getAllUsersExceptLoggedIn.bind(userController));

module.exports = router;