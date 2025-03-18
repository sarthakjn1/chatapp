const { AppError } = require('../utils/errorHandler');
const messageQueueService = require('../services/messageQueueService');
const MessageRepository = require('../repositories/messageRepository');

const messageRepository = new MessageRepository();


class MessageController {
  constructor() {
    this.messageRepository = new MessageRepository();
  }
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

  async getMessagesBetweenUsers(req, res, next) {
    try {
      const { senderId, receiverId } = req.query;

      // Validate input
      if (!senderId || !receiverId) {
        throw new AppError('Both senderId and receiverId are required', 400);
      }

      // Fetch messages between the two users
      const messages = await this.messageRepository.findMessagesBetweenUsers(senderId, receiverId);

      res.status(200).json({
        status: 'success',
        data: {
          messages,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MessageController;