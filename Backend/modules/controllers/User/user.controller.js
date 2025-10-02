const userModel = require('../../models/Users/user.model');
const { validationResult } = require('express-validator');
const userService = require('../../services/User/user.service');
const jwt = require('jsonwebtoken');


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
    
    return res.status(201).json({ user: newUser, token: token });
  } catch (error) {
    next(error);
  }
};


module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try{
    const user = await userService.findUser(email);
    if(!user){
      return res.status(401).json({ errors: [{ msg: 'Invalid email or password' }] });
    }
    const isMatch = await user.comparePassword(password, user.password);
    if(!isMatch){
      return res.status(401).json({ errors: [{ msg: 'Invalid email or password' }] });
    }
    const token = user.generateAuthToken();
    res.cookie('token', token)
    return res.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
}

module.exports.getUserProfile = async (req, res, next) => {
  try{
    res.status(200).json({ user: req.user });
  }catch(error){
    next(error);
  }
}

module.exports.logoutUser = async (req, res, next) => {
  try{
    res.clearCookie('token');
    const token = req.cookies.token || req.header('Authorization').replace('Bearer ', '');
    await userService.blacklistToken(token);
    return res.status(200).json({ message: 'Logged out successfully' });
  }catch(error){
    next(error);
  }
}