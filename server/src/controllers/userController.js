const { AppError } = require('../utils/errorHandler');
const UserRepository = require('../repositories/userRepository');

class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsersExceptLoggedIn(req, res, next) {
    try {
      const { email } = req.query; // Assume email is passed as a query parameter

      if (!email) {
        throw new AppError('Email is required', 400);
      }

      // Fetch all users except the logged-in user
      const users = await this.userRepository.findAllExcept(email);

      res.status(200).json({
        status: 'success',
        data: {
          users,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;