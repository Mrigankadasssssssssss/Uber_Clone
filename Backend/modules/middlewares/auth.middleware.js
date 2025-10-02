const userModel = require('../models/Users/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const blackListedModel = require('../models/Users/blackListToken.model')
const driverModel = require('../models/Drivers/driver.model')

module.exports.authUser = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1] || req.cookies.token;
    if (!token) {
        return res.status(401).json({ errors: [{ msg: 'Unauthorized User' }] });
    }
    const isBlacklisted = await blackListedModel.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({ errors: [{ msg: 'User is Unauthorized' }] });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ errors: [{ msg: 'User not found' }] });
        }
        
        req.user = user;
        return next();
    } catch (err) {
        return res.status(401).json({ errors: [{ msg: 'User is not valid' }] });
    }
}

module.exports.authDriver = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1] || req.cookies.token;
    if (!token) {
        return res.status(401).json({ errors: [{ msg: 'Unauthorized Driver' }] });
    }
    const isBlacklisted = await blackListedModel.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({ errors: [{ msg: 'Driver is Unauthorized' }] });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const driver = await driverModel.findById(decoded.id);
        if (!driver) {
            return res.status(401).json({ errors: [{ msg: 'Driver not found' }] });
        }
        req.driver = driver;
        return next();
    } catch (err) {
        console.error("JWT verify failed:", err.name, err.message);
        return res.status(401).json({ errors: [{ msg: 'Driver is not valid' }] });
    }
}