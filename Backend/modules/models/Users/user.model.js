const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullName: { 
        firstName: { type: String, required: true , minLength:[2,'First name must be at least 2 characters long'] },
        lastName: { type: String, minLength:[2,'Last name must be at least 2 characters long'] }
     },
    email: { type: String, required: true, unique: true,minLength:[5,'Email must be at least 5 characters long'] },
    password: { type: String, required: true , select:false },
    socketID: { type: String },
    createdAt: { type: Date, default: Date.now }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

userSchema.statics.hashPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

const User = mongoose.model('User', userSchema);

module.exports = User;
