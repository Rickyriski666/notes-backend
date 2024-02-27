const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://rickyriski:${password}@database.5ivmwjy.mongodb.net/?retryWrites=true&w=majority&appName=database`;

mongoose.set('strictQuery', false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  title: String,
  body: String,
  createdAt: String,
  archived: Boolean
});

const Note = mongoose.model('Note', noteSchema);

const notesToSave = [
  {
    id: 1,
    title: 'awikwok',
    body: 'HTML is easy',
    createdAt: '2022-04-14T04:27:34.572Z',
    archived: false
  },
  {
    id: 2,
    title: 'ahay',
    body: 'Browser can execute only JavaScript',
    createdAt: '2022-04-14T04:27:34.572Z',
    archived: false
  },
  {
    id: 3,
    title: 'lahh',
    body: 'GET and POST are the most important methods of HTTP protocol',
    createdAt: '2022-04-14T04:27:34.572Z',
    archived: false
  }
];

Note.insertMany(notesToSave)
  .then((result) => {
    console.log('Data Saved', result);
    mongoose.connection.close();
  })
  .catch((error) => {
    console.log('Failed to save', error);
  });

// note.save().then((result) => {
//   console.log('note saved!');
//   mongoose.connection.close();
// });

// Note.find({}).then((result) => {
//   result.forEach((note) => {
//     console.log(note);
//   });
//   mongoose.connection.close();
// });
