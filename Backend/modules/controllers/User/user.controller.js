const userModel = require('../../models/Users/user.model');
const { validationResult } = require('express-validator');
const userService = require('../../services/User/user.service');

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, password } = req.body;
  const hashedPassword = await userModel.hashPassword(password);
  try {
    const newUser = await userService.createUser({
      firstName:fullName.firstName,
      lastName:fullName.lastName,
      email,
      password: hashedPassword,
    });
    const token = newUser.generateAuthToken();
    res.header('Authorization', `Bearer ${token}`);
    return res.status(201).json({ user: newUser, token: token });
  } catch (error) {
    next(error);
  }
};