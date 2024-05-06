const { test, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const bcrypt = require('bcrypt');
const User = require('../../models/user');
const helper = require('./test_user_helper');
const app = require('../../app');
const supertest = require('supertest');

const api = supertest(app);

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('root123', 10);
    const user = new User({
      username: 'root',
      name: 'root',
      password: passwordHash
    });

    await user.save();
  });

  test('Successfully created one user', async () => {
    const userAtStart = await helper.datasInDb();

    const newUser = {
      username: 'user1',
      name: 'user1',
      password: 'passwordUser1'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', helper.contentType);

    const userAtEnd = await helper.datasInDb('User');
    assert.strictEqual(userAtEnd.length, userAtStart.length + 1);

    const usernames = userAtEnd.map((username) => username.username);
    assert(usernames.includes(newUser.username));
  });

  test('fail to save user and send message failed to save', async () => {
    const userAtStart = await helper.datasInDb();

    const newUser = {
      username: 'root',
      name: 'root',
      password: 'passwordRoot1'
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', helper.contentType);

    const userAtEnd = await helper.datasInDb();

    assert.strictEqual(userAtStart.length, userAtEnd.length);
    assert(response.body.message.includes('expected username to be unique'));
  });
});
