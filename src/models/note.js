const mongoose = require('mongoose');
const db = require('../db/db');
require('dotenv').config();

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 5,
    require: true,
  },
  body: String,
  createdAt: String,
  archived: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();

    delete returnedObject.__v;
    delete returnedObject._id;

    return {
      id: returnedObject.id,
      ...returnedObject,
    };
  },
});

const Note = db.model('Note', noteSchema);

module.exports = Note;
