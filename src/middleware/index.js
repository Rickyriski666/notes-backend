const errorHandler = require('./errorHandler');
const requestLogger = require('./requestLogger');
const unknownEndpoint = require('./unknownEndpoint');
const validateToken = require('./validateToken');

module.exports = {
  errorHandler,
  requestLogger,
  unknownEndpoint,
  validateToken,
};
