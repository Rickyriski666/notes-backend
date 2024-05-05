const notesRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const DB = require('../models');
const getToken = require('../utils/getToken');

notesRouter.get('/', async (req, res) => {
  const notes = await DB.noteModel
    .find({})
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
    const { title, body, createdAt, archived, userId } = req.body;

    const decodedToken = jwt.verify(getToken(req), process.env.SECRET_JWT);
    if (!decodedToken.id) {
      return res.status(401).json({
        status: 'failed',
        message: 'Token Invalid',
      });
    }

    const user = await DB.userModel.findById(decodedToken.id);

    const note = new DB.noteModel({
      title: title,
      body: body,
      createdAt: createdAt,
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
      res.status(200).json({
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
        status: 'updated successfully',
        notes: updatedNote,
      });
    })
    .catch((error) => next(error));
});

module.exports = notesRouter;
