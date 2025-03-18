const { AppError } = require('../utils/errorHandler');
const messageQueueService = require('../services/messageQueueService');
const multer = require('multer');

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

class FileController {
  async uploadFile(req, res, next) {
    try {
      const { sender_id, receiver_id, message_id } = req.body;
      const file = req.file;

      if (!file) {
        throw new AppError('No file uploaded', 400);
      }

      // Enqueue the file
      await messageQueueService.enqueueMessage({
        type: 'file', // Indicate that this is a file
        sender_id,
        receiver_id,
        message_id,
        file_url: `/uploads/${file.filename}`,
        file_type: file.mimetype,
        file_size: file.size,
      });

      res.status(201).json({
        status: 'success',
        message: 'File enqueued for processing',
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { FileController, upload };