const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    number: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;