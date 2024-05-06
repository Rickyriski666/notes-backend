const userRouter = require('express').Router();
const DB = require('../models');
const bcrypt = require('bcrypt');

userRouter.get('/', async (req, res) => {
  const users = await DB.userModel.find({}).populate('notes', {
    user: 0,
  });

  res.status(200).json({
    status: 'get user successfull',
    data: users,
  });
});

userRouter.post('/', async (req, res, next) => {
  try {
    const { username, name, password } = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new DB.userModel({
      username,
      name,
      password: passwordHash,
    });

    const savedUser = await user.save();

    res.status(201).json({
      status: 'create user successfull',
      data: savedUser,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
