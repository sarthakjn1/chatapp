const express = require('express');
const MessageController = require('../controllers/messageController');

const router = express.Router();
const messageController = new MessageController();

router.post('/send', messageController.sendMessage.bind(messageController));

module.exports = router;