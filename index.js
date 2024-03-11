const express = require('express');
const app = express();
const logger = require('./src/utils/logger');
const middleware = require('./src/middleware');
const notesRouter = require('./src/controllers/notes');
require('dotenv').config();

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(middleware.requestLogger);

app.get('/', (req, res) => {
  res.send(`<h1>Hello World!</h1>`);
});

app.use('/api/notes', notesRouter);

app.use(middleware.unknownEndpoint);

app.use(middleware.errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  logger.info(`Server Running on ${PORT}`);
});
