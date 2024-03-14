const logger = require('../utils/logger');

const errorHandler = (error, req, res, next) => {
  logger.info(error.message);

  if (error.name === 'CastError') {
    return res.status(400).json({
      status: 'Error',
      message: 'malformatted id'
    });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      status: 'Failed to Save',
      message: error.message
    });
  }
};

module.exports = errorHandler;
