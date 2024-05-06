const jwt = require('jsonwebtoken');
const bycrypt = require('bcrypt');
const loginRouter = require('express').Router();
const DB = require('../models');

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  const user = await DB.userModel.findOne({ username });

  const passwordCorrect =
    user === null ? false : await bycrypt.compare(password, user.password);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      status: 'Failed to Login',
      message: 'invalid username or password',
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET_JWT, {
    expiresIn: 3600,
  });

  res.status(200).json({
    status: 'Success',
    message: 'Login Successfull',
    data: {
      token,
      username: user.username,
      name: user.name,
    },
  });
});

module.exports = loginRouter;
