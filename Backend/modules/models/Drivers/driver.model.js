const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const driverSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minLength: [2, "First name must be at least 2 characters long"],
    },
    lastName: {
      type: String,
      minLength: [2, "Last name must be at least 2 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: [5, "Email must be at least 5 characters long"],
  },
  password: { type: String, required: true, select: false },
  socketID: { type: String },
  status:{
    type: String,
    enum: ['available', 'unavailable', 'on-trip'],
    default: 'unavailable'
  },
  vehicle: {
    color: { type: String, required: true },
    numberPlate: { type: String, required: true, unique: true , minLength:[5,'Number plate must be at least 5 characters long'] },
    capacity: { type: Number, required: true, min:[2,'Capacity must be at least 2']  },
    vehicleType: { type: String, required: true, enum: ['car', 'bike', 'auto'] },
  },
  location: {
    lat:{ type: Number, default: 0 },
    lng:{ type: Number, default: 0 }
  },
  createdAt: { type: Date, default: Date.now },
});

driverSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

driverSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

driverSchema.statics.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

const Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;