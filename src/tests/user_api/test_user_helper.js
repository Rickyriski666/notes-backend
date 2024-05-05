const User = require('../../models/user');

const datasInDb = async () => {
  const datas = await User.find({});

  return datas.map((data) => data.toJSON());
};

const contentType = /application\/json/;

module.exports = {
  datasInDb,
  contentType
};
