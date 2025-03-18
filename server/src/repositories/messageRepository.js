const BaseRepository = require('./baseRepository');
const { Message } = require('../models');
const { Op } = require('sequelize');

class MessageRepository extends BaseRepository {
  constructor() {
    super(Message);
  }

  async createMessageWithSequence(data) {
    return this.model.create(data);
  }

  async findMessagesBetweenUsers(senderId, receiverId) {
    return this.model.findAll({
      where: {
        [Op.or]: [
          { sender_id: senderId, receiver_id: receiverId },
          { sender_id: receiverId, receiver_id: senderId },
        ],
      },
      order: [['createdAt', 'ASC']], 
    });
  }

}

module.exports = MessageRepository;