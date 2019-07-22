const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: String,
    password: String,
    email: String,
    gender: String,
    mobileNumber: String,
    confirmPassword: String
});

const userModel = mongoose.model('user',UserSchema);

module.exports = userModel;