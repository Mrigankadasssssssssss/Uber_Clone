const driverModel = require('../../models/Drivers/driver.model');
const { validationResult } = require('express-validator');
const driverService = require('../../services/Drivers/driver.service');
const blackListedModel = require('../../models/Users/blackListToken.model');


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

module.exports.loginDriver = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
        const { email, password} = req.body;
        const driver = await driverService.findDriverByEmail(email);
        if(!driver){
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const isMatch = await driver.comparePassword(password, driver.password);
        if(!isMatch){
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const token = driver.generateAuthToken();
        res.cookie('token', token);
        return res.status(200).json({ driver: driver, token: token });
    }catch(error){
        next(error);
    }
}


module.exports.getDriverProfile = async (req, res, next) => {
    try{
        res.status(200).json({ driver: req.driver });
    }catch(error){
        next(error);
    }
}

module.exports.logoutDriver = async (req, res, next) => {
    try {
        res.clearCookie('token');
        const token = req.header('Authorization')?.split(' ')[1] || req.cookies.token;
        const blackListedToken = new blackListedModel({ token });
        await blackListedToken.save();
        return res.status(200).json({ message: 'Driver logged out successfully' });
    } catch (error) {
        next(error);
    }
}