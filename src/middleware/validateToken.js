const jwt = require('jsonwebtoken');
const { error } = require('../utils/logger');
const getToken = require('../utils/getToken');
require('dotenv').config();

const validateToken = async (req, res, next) => {
  try {
    const token = getToken(req);

    const decode = jwt.verify(token, process.env.SECRET_JWT);

    req.user = {
      id: decode.id,
      username: decode.username,
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateToken;
