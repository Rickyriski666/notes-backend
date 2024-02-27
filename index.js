const express = require('express');
const Note = require('./src/models/note');
const app = express();
require('dotenv').config();

const cors = require('cors');
app.use(cors());

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};

app.use(express.json());
app.use(requestLogger);

app.get('/', (req, res) => {
  res.send(`<h1>Hello World!</h1>`);
});

app.get('/api/notes', (req, res) => {
  Note.find({}).then((notes) => {
    res.status(200).json({
      status: 'success',
      notes: notes
    });
  });
});

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const note = Note.find((note) => note.id === id);

  if (note) {
    res.status(200).json({
      status: 'success',
      notes: note
    });
  } else {
    res.status(404).json({
      status: 404,
      message: 'Data Not found'
    });
  }
});

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  notes = notes.filter((note) => note.id !== id);

  res.status(204).json({
    status: 204,
    message: 'Delete Succesfull'
  });
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post('/api/notes', (req, res) => {
  const { title, body, createdAt, archived } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'content missing' });
  }

  const note = new Note({
    title: title,
    body: body,
    createdAt: createdAt,
    archived: archived
  });

  note.save().then((savedNote) => {
    res.status(201).json({
      status: 'success',
      notes: savedNote
    });
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
