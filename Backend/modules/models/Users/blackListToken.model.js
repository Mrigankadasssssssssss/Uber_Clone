const mongoose = require('mongoose');
const blackListTokenSchema = new mongoose.Schema({
    token: { type: String, required: true },
    blacklistedAt: { type: Date, default: Date.now, expires: '24h' } // Token expires after 24 hours
});
const BlackListToken = mongoose.model('BlackListToken', blackListTokenSchema);

module.exports = BlackListToken;