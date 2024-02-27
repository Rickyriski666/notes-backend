const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', false);

const url = process.env.mongo_URL;

console.log(`connecting to mongo`);

mongoose
  .connect(url)
  .then((result) => {
    console.log(`connected to db`);
  })
  .catch((error) => {
    console.log(`error connecting to db: ${error.message}`);
  });

const noteSchema = new mongoose.Schema({
  title: String,
  body: String,
  createdAt: String,
  archived: Boolean
});

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('note', noteSchema);
