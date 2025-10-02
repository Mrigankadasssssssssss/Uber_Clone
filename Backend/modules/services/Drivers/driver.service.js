const driverModel = require('../../models/Drivers/driver.model');

module.exports.createDriver = async ({ firstName, lastName, email, password, color, numberPlate, capacity, vehicleType }) => {
    if(!firstName || !email || !password || !color || !numberPlate || !capacity || !vehicleType) {
        throw new Error('Missing required fields');
    }
    const newDriver = new driverModel({
        fullName: { firstName, lastName },
        email,
        password,
        vehicle: { color, numberPlate, capacity, vehicleType }
    });
    await newDriver.save();
    return newDriver;
  }

module.exports.findDriverByEmail = async (email) => {
    return await driverModel.findOne({ email }).select('+password');
}