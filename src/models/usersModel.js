const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  },
  token: String,
  expiry: Date
});

const User = model("User", userSchema);

module.exports = User;
