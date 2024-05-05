const { default: mongoose } = require('mongoose');
const DB = require('../models');
const helper = require('./test_helper');
const hashPassword = require('../utils/hashPassword');

const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

beforeEach(async () => {
  await DB.noteModel.deleteMany({});
  await DB.userModel.deleteMany({});

  for (const user of helper.initialUser) {
    const usermodel = new DB.userModel({
      ...user,
      password: await hashPassword(user.password),
    });

    await usermodel.save();
  }

  const user = await DB.userModel.findOne({ username: 'usertest1' });
  for (const note of helper.initialNotes) {
    const notesmodel = new DB.noteModel({
      ...note,
      user: user.id,
    });

    await notesmodel.save();
  }
});

describe('get notes', () => {
  test('should return json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', helper.contentType);
  });

  test('should get all notes', async () => {
    const dataOnDb = await helper.datasInDb();

    const response = await api.get('/api/notes').expect(200);
    const notes = response.body.notes;

    expect(notes.length).toEqual(dataOnDb.length);
  });

  test('should have property id', async () => {
    const response = await api.get('/api/notes');
    const notes = response.body.notes;

    for (const note of notes) {
      expect(note).toHaveProperty('id');
      expect(note).not.toHaveProperty('_id');
      expect(note).not.toHaveProperty('__v');
    }
  });
});

describe('create note', () => {
  test('should login first to create note', async () => {});
});

afterAll(() => {
  mongoose.connection.close();
});
