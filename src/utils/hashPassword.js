const bcrypt = require('bcrypt');

const hashPassword = async (passowrd) => {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(passowrd, salt);

  return passwordHash;
};

module.exports = hashPassword;
