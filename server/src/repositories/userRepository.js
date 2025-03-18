const BaseRepository = require('./baseRepository');
const { User } = require('../models');
const { Op } = require('sequelize');


class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  // Additional methods specific to the User model
  async findUserByEmail(email) {
    return this.model.findOne({ where: { email } });
  }

  async findAllExcept(email) {
    return this.model.findAll({
      where: {
        email: {
          [Op.ne]: email, // Exclude the logged-in user
        },
      },
    });
  }
}

module.exports = UserRepository;