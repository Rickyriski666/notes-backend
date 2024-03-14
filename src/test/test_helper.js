const Note = require('../models/note');

const initialNotes = [
  {
    title: 'HTML is easy',
    body: 'HTML is easy',
    createdAt: '2022-04-14T04:27:34.572Z',
    archived: false
  },
  {
    title: 'Browser can execute only JavaScript',
    body: 'Browser can execute only JavaScript',
    createdAt: '2022-04-14T04:27:34.572Z',
    archived: true
  }
];

const nonExistingId = async () => {
  const note = new Note({ title: 'willremovethissoon' });
  await note.save();
  await note.deleteOne;

  return note._id.toString;
};

const notesInDb = async () => {
  const notes = await Note.find({});

  return notes.map((note) => note.toJSON());
};

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb
};
