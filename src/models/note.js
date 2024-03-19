const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', false);

const url =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGO_URL
    : process.env.MONGO_URL;

console.log(`connecting to mongo`);

mongoose
  .connect(url)
  .then((result) => {
    console.log(`connected to db `);
  })
  .catch((error) => {
    console.log(`error connecting to db: ${error.message}`);
  });

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 5,
    require: true
  },
  body: String,
  createdAt: String,
  archived: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();

    delete returnedObject.__v;
    delete returnedObject._id;

    return {
      id: returnedObject.id,
      ...returnedObject
    };
  }
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
