const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  Name: String,
  Phone: String,
});
module.exports = mongoose.model("User", userSchema, "User");
