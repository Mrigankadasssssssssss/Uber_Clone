const express = require("express");
const routes = express.Router();
const driverController = require("../controllers/Drivers/driver.controller");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");

// Driver Registration Route
console.log(driverController);
routes.post(
  "/register",
  [
    body("fullName.firstName")
      .isLength({ min: 2 })
      .withMessage("First name must be at least 2 characters long"),
    body("fullName.lastName")
      .isLength({ min: 2 })
      .withMessage("Last name must be at least 2 characters long"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("vehicle.color").notEmpty().withMessage("Vehicle color is required"),
    body("vehicle.numberPlate")
      .isLength({ min: 5 })
      .withMessage("Number plate must be at least 5 characters long"),
    body("vehicle.capacity")
      .isInt({ min: 2 })
      .withMessage("Capacity must be at least 2"),
    body("vehicle.vehicleType")
      .isIn(["car", "bike", "auto"])
      .withMessage("Vehicle type must be car, bike, or auto"),
  ],
  driverController.registerDriver
);

// Driver Login Route
routes.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email address"),
    body("password").exists().withMessage("Password is required"),
    
  ],
  driverController.loginDriver
);

// Get Driver Profile Route
routes.get('/profile', authMiddleware.authDriver, driverController.getDriverProfile);



// Driver Logout Route
routes.get('/logout', authMiddleware.authDriver, driverController.logoutDriver);

module.exports = routes;
