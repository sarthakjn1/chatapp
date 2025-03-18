const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AppError } = require('../utils/errorHandler');
const UserRepository = require('../repositories/userRepository.js');

class AuthController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(req, res, next) {
    const { username, email, password } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await this.userRepository.findUserByEmail(email);
      if (existingUser) {
        throw new AppError('User with this email already exists', 400);
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user
      const user = await this.userRepository.create({
        username,
        email,
        password_hash: hashedPassword,
      });

      res.status(201).json({
        status: 'success',
        data: {
          user,
        },
      });
    } catch (error) {
      next(error); // Pass the error to the error handling middleware
    }
  }

  async login(req, res, next) {
    const { email, password } = req.body;

    try {
      // Find the user by email
      const user = await this.userRepository.findUserByEmail(email);
      if (!user) {
        throw new AppError('Invalid credentials', 401);
      }

      // Check if the password is correct
      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      if (!isValidPassword) {
        throw new AppError('Invalid credentials', 401);
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: user.id }, 'your_secret_key', {
        expiresIn: '1h',
      });

      return res.status(200).json({
        status: 'success',
        data: {
          token,
          email: user.email,
          id: user.id
        },
      });
    } catch (error) {
      next(error); // Pass the error to the error handling middleware
    }
  }
}

module.exports = AuthController;