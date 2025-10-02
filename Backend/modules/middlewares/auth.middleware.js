const userModel = require('../models/Users/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.authUser = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1] || req.cookies.token;
    if (!token) {
        return res.status(401).json({ errors: [{ msg: 'Unauthorized User' }] });
    }
    const isBlacklisted = await userModel.findOne({ token });
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