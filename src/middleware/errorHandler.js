const logger = require('../utils/logger');

const errorHandler = (error, req, res, next) => {
  logger.info(error.message);
  logger.info(error.stack);

  if (error.name === 'CastError') {
    return res.status(400).json({
      status: 'Error',
      message: 'malformatted id',
    });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      status: 'Failed to Save',
      message: error.message,
    });
  }

  if (error.name === 'JsonWebTokenError') {
    return res.status(401).send({
      status: 'Failed to Login',
      message: error.message,
    });
  }

  if (error.name === 'TokenExpiredError') {
    return res.status(401).send({
      status: 'Token Expired',
      message: error.message,
    });
  }
};

module.exports = errorHandler;
