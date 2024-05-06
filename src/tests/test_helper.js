const models = require('../models');

const initialNotes = [
  {
    title: 'Note1',
    body: 'Note1',
    createdAt: '2022-04-14T04:27:34.572Z',
    archived: false,
  },
  {
    title: 'Note2',
    body: 'Note2',
    createdAt: '2022-04-14T04:27:34.572Z',
    archived: true,
  },
];

const initialUser = [
  {
    username: 'usertest1',
    name: 'usertest1',
    password: 'passwordUserTest1',
  },
  {
    username: 'usertest2',
    name: 'usertest2',
    password: 'passwordUserTest2',
  },
];

const nonExistingId = async () => {
  const note = new models.noteModel({ title: 'willremovethissoon' });
  await note.save();
  await note.deleteOne;

  return note._id.toString;
};

const datasInDb = async () => {
  const datas = await models.noteModel.find({});

  return datas.map((data) => data);
};

const contentType = /application\/json/;

module.exports = {
  initialNotes,
  initialUser,
  nonExistingId,
  datasInDb,
  contentType,
};
