const express = require('express');
const Note = require('./src/models/note');
const app = express();
const logger = require('./src/utils/logger');
const notesRouter = require('./src/controllers/notes');
require('dotenv').config();

const cors = require('cors');
app.use(cors());

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};

app.use(express.json());
app.use(requestLogger);

app.get('/', (req, res) => {
  res.send(`<h1>Hello World!</h1>`);
});

app.use('/api/notes', notesRouter);

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  logger.info(error.message);

  if (error.name === 'CastError') {
    return res.status(400).json({
      status: 'error',
      message: 'malformatted id'
    });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).json({
      status: ' Failed to save',
      message: error.message
    });
  }
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  logger.info(`Server Running on ${PORT}`);
});
