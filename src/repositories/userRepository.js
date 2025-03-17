const BaseRepository = require('./baseRepository');
const { User }  = require('../models');

class UserRepository extends BaseRepository {
  constructor() {
    super(User); // Pass the User model to the BaseRepository
  }

  // Additional methods specific to the User model
  async findUserByEmail(email) {
    return this.model.findOne({ where: { email } });
  }
}

module.exports = UserRepository;