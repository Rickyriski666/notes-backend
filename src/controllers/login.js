const jwt = require('jsonwebtoken');
const bycrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');
const getToken = require('../utils/getToken');

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

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

  const token = jwt.sign(userForToken, process.env.SECRET_JWT);

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
