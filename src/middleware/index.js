const errorHandler = require('./errorHandler');
const requestLogger = require('./requestLogger');
const unknownEndpoint = require('./unknownEndpoint');

module.exports = {
  errorHandler: errorHandler,
  requestLogger: requestLogger,
  unknownEndpoint: unknownEndpoint
};
