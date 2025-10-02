const userModel = require("../../models/Users/user.model");
const blackListTokenModel = require('../../models/Users/blackListToken.model');

// Example controller function to create a new user
async function createUser({ firstName, lastName, email, password }) {
  try {
    if (!firstName || !email || !password) {
      throw new Error("First name, email, and password are required");
    }
    const newUser = new userModel({
      fullName: { firstName, lastName },
      email,
      password,
    });
    await newUser.save();
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Internal server error");
  }
}
async function findUser(email){
  try{
    const user = await userModel.findOne({ email }).select('+password');
    return user;
  } catch (error) {
    console.error("Error finding user:", error);
    throw new Error("Internal server error");
  }
}

async function blacklistToken(token) {
  try{
    const blacklistedToken = new blackListTokenModel({ token });
    await blacklistedToken.save();
    return blacklistedToken;
  } catch (error) {
    console.error("Error blacklisting token:", error);
    throw new Error("Internal server error");
  }
}

module.exports = {
  createUser,
  findUser,
  blacklistToken,
};
