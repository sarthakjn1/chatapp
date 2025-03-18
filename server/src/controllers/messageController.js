const { AppError } = require('../utils/errorHandler');
const messageQueueService = require('../services/messageQueueService');

class MessageController {
  async sendMessage(req, res, next) {
    const { sender_id, receiver_id, content } = req.body;

    try {
      // Enqueue the message
      await messageQueueService.enqueueMessage({
        type: 'message', // Indicate that this is a message
        sender_id,
        receiver_id,
        content,
      });

      res.status(201).json({
        status: 'success',
        message: 'Message enqueued for processing',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MessageController;