const express = require('express');
const app = express();
const cors = require('cors');
const middleware = require('./middleware');
const notesRouter = require('./controllers/notes');
const userRouter = require('./controllers/user');
const loginRouter = require('./controllers/login');
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`<h1>Hello World!</h1>`);
});

app.use('/api/login', loginRouter);
app.use('/api/notes', middleware.validateToken, notesRouter);
app.use('/api/users', userRouter);

app.use(middleware.unknownEndpoint);

app.use(middleware.errorHandler);

module.exports = app;
