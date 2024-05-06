const notesRouter = require('express').Router();
const DB = require('../models');

notesRouter.get('/', async (req, res) => {
  const notes = await DB.noteModel
    .find({ user: req.user.id })
    .populate('user', { password: 0, notes: 0 });

  res.status(200).json({
    status: 'success',
    notes: notes,
  });
});

notesRouter.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const note = await DB.noteModel.findById(id);

    if (note) {
      res.status(200).json({
        status: 'success',
        notes: note,
      });
    } else {
      res.status(404).json({
        status: 'failed',
        message: 'Data Not Found',
      });
    }
  } catch (error) {
    next(error);
  }
});

notesRouter.post('/', async (req, res, next) => {
  try {
    const { title, body, archived } = req.body;

    const user = await DB.userModel.findById(req.user.id);

    const note = new DB.noteModel({
      title: title,
      body: body,
      createdAt: new Date(),
      archived: archived,
      user: user.id,
    });

    const savedNote = await note.save();
    user.notes = user.notes.concat(savedNote._id);
    await user.save();

    res.status(201).json({
      status: 'success',
      notes: savedNote,
    });
  } catch (error) {
    next(error);
  }
});

notesRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const noteToDelete = await DB.noteModel.findByIdAndDelete(id);

    if (noteToDelete) {
      res.status(204).json({
        status: 'deleted successfully',
        notes: noteToDelete,
      });
    } else {
      res.status(404).json({
        status: 'deleted failed',
        message: 'note not found',
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
    archived: archived,
  };

  DB.noteModel
    .findByIdAndUpdate(id, note, { new: true })
    .then((updatedNote) => {
      res.status(200).json({
        status: 'update successfully',
        notes: updatedNote,
      });
    })
    .catch((error) => next(error));
});

module.exports = notesRouter;
