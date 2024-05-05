const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
  const token = req.get('Authorization');

  console.log(token);
};

module.exports = validateToken;
