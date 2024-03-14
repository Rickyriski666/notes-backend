const notesRouter = require('express').Router();
const Note = require('../models/note');

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({});

  res.status(200).json({
    status: 'success',
    notes: notes
  });
});

notesRouter.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const note = await Note.findById(id);

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
  } catch (error) {
    next(error);
  }
});

notesRouter.post('/', async (req, res, next) => {
  const { title, body, createdAt, archived } = req.body;

  const note = new Note({
    title: title,
    body: body,
    createdAt: createdAt,
    archived: archived
  });

  try {
    const savedNote = await note.save();
    res.status(201).json({
      status: 'success',
      notes: savedNote
    });
  } catch (error) {
    next(error);
  }
});

notesRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const noteToDelete = await Note.findByIdAndDelete(id);

    if (noteToDelete) {
      res.status(200).json({
        status: 'deleted successfully',
        notes: noteToDelete
      });
    } else {
      res.status(404).json({
        status: 'deleted failed',
        message: 'note not found'
      });
    }
  } catch (error) {
    next(error);
  }
});

notesRouter.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const { title, body, createdAt, archived } = req.body;

  const note = {
    title: title,
    body: body,
    createdAt: createdAt,
    archived: archived
  };

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
