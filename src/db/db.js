const mongoose = require('mongoose');
require('dotenv').config();

const url =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGO_URL
    : process.env.MONGO_URL;

console.log(`connecting to mongo`);

mongoose.set('strictQuery', false);

mongoose
  .connect(url)
  .then((result) => {
    console.log(`connected to db `);
  })
  .catch((error) => {
    console.log(`error connecting to db: ${error.message}`);
  });

module.exports = mongoose;
