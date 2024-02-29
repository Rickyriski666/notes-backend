const notesRouter = require('express').Router();
const Note = require('../models/note');
const { error } = require('../utils/logger');

notesRouter.get('/', (req, res) => {
  Note.find({}).then((notes) => {
    res.status(200).json({
      status: 'success',
      notes: notes
    });
  });
});

notesRouter.get('/:id', (req, res, error) => {
  const id = req.params.id;
  Note.findById(id)
    .then((note) => {
      if (note) {
        res.status(200).json({
          status: 'success',
          notes: note
        });
      } else {
        res.status(404).json({
          status: 'failed',
          message: 'Data Not Found'
        });
      }
    })
    .catch((error) => next(error));
});

notesRouter.post('/', (req, res, next) => {
  const { title, body, createdAt, archived } = req.body;

  const note = new Note({
    title: title,
    body: body,
    createdAt: createdAt,
    archived: archived
  });

  note
    .save()
    .then((savedNote) => {
      res.status(200).json({
        status: 'success',
        notes: savedNote
      });
    })
    .catch((error) => next(error));
});

notesRouter.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  Note.findByIdAndDelete(id)
    .then((note) => {
      if (note) {
        res.status(200).json({
          status: 'deleted successfully',
          notes: note
        });
      } else {
        res.status(200).json({
          status: 'deleted failed',
          message: 'note not found'
        });
      }
    })
    .catch((error) => next(error));
});

notesRouter.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const { title, body, createdAt, archived } = req.body;

  const note = new Note({
    title: title,
    body: body,
    createdAt: createdAt,
    archived: archived
  });

  Note.findByIdAndUpdate(id, note, { new: true })
    .then((updatedNote) => {
      res.status(200).json({
        status: 'updated successfully',
        notes: updatedNote
      });
    })
    .catch((error) => next(error));
});

module.exports = notesRouter;
