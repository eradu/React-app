//import mongoose to create new Schema
const mongoose = require("mongoose");

//create Schema for the user
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

// export this Schema
module.exports = mongoose.model("User", UserSchema);
