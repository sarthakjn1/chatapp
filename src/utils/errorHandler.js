class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true; // Mark errors that we create as operational errors
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  // Centralized error handling middleware
  const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
  
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  };
  
  module.exports = { AppError, errorHandler };