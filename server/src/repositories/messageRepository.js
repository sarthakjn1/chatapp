const BaseRepository = require('./baseRepository');
const { Message } = require('../models');

class MessageRepository extends BaseRepository {
  constructor() {
    super(Message);
  }

  async createMessageWithSequence(data) {
    return this.model.create(data);
  }
}

module.exports = MessageRepository;