const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String // donor or ngo
});

module.exports = mongoose.model("User", userSchema);