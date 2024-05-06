const { test, after, beforeEach } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../app');
const models = require('../../models');
const api = supertest(app);
const helper = require('../test_helper');

beforeEach(async () => {
  await models.noteModel.deleteMany({});

  for (const note of helper.initialNotes) {
    let noteObject = new models.noteModel(note);
    await noteObject.save();
  }
});

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('there are two notes', async () => {
  const response = await api.get('/api/notes');

  assert.strictEqual(response.body.notes.length, helper.initialNotes.length);
});

test('the first node is about HTTP methods', async () => {
  const response = await api.get('/api/notes');

  const contents = response.body.notes.map((e) => e.title);
  assert(contents.includes('HTML is easy'));
});

test('a valid note can be added', async () => {
  const newNote = {
    title: 'async/await simplifies making async calls',
    body: '',
    createdAt: '2022-04-14T04:27:34.572Z',
    archived: false,
  };

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await helper.datasInDb();

  const contents = response.map((note) => note.title);

  assert.strictEqual(response.length, helper.initialNotes.length + 1);

  assert(contents.includes('async/await simplifies making async calls'));
});

test('note without tittle is not added', async () => {
  const newNote = {
    title: '',
    body: '',
    createdAt: '2022-04-14T04:27:34.572Z',
    archived: false,
  };

  await api.post('/api/notes').send(newNote).expect(400);

  const response = await helper.datasInDb();

  assert.strictEqual(response.length, helper.initialNotes.length);
});

test('a note can be deleted', async () => {
  const noteAtStart = await helper.datasInDb();
  const notesToDelete = noteAtStart[0];

  await api.delete(`/api/notes/${notesToDelete.id}`);

  const notesAtEnd = await helper.datasInDb();

  const content = notesAtEnd.map((r) => r.title);

  assert(!content.includes(notesToDelete.title));
  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1);
});

test('wrong id to delete', async (done) => {
  const wrongId = '65dd1b8cd9674e3a005bbc10';
  const malformatedId = '65dd1b8cd9674e3a005bbcc';

  await api.delete(`/api/notes/${wrongId}`).expect(404);

  await api.delete(`/api/notes/${malformatedId}`).expect(400);
});

after(async () => {
  return await mongoose.connection.close();
});
