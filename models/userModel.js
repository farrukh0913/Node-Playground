const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({ id: Number, name: String });
const userModel = mongoose.model("users", userSchema, "users");

module.exports = userModel;