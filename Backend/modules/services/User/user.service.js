const userModel = require("../../models/Users/user.model");

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

module.exports = {
  createUser,
};
