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

const datasInDb = async () => {
  const datas = await Note.find({});

  return datas.map((data) => data.toJSON());
};

const contentType = /application\/json/;

module.exports = {
  initialNotes,
  nonExistingId,
  datasInDb,
  contentType
};
