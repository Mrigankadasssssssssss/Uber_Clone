const driverModel = require('../../models/Drivers/driver.model');
const { validationResult } = require('express-validator');
const driverService = require('../../services/Drivers/driver.service');


module.exports.registerDriver = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const{ fullName, email, password, vehicle } = req.body;
      const existingDriver = await driverModel.findOne({ email });
      if (existingDriver) {
        return res.status(400).json({ error: 'Driver with this email already exists' });
      }
      const hashedPassword = await driverModel.hashPassword(password);
      
      const driver = await driverService.createDriver({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email,
        password: hashedPassword,
        color: vehicle.color,
        numberPlate: vehicle.numberPlate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
      });
      const token = driver.generateAuthToken();
      return res.status(201).json({ driver: driver, token: token });
    } catch (error) {
      next(error);
    }
}