const mongoose = require('mongoose');
const noteSchema = require('./note');
const userSchema = require('./user');
require('dotenv').config();

mongoose.set('strictQuery', false);

const URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGO_URL
    : process.env.MONGO_URL;

mongoose
  .connect(URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const noteModel = mongoose.model('Note', noteSchema);
const userModel = mongoose.model('User', userSchema);

module.exports = { noteModel, userModel };
