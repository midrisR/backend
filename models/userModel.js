const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "cannot be an empty field"],
    max: 225,
  },
  email: {
    type: String,
    required: [true, "cannot be an empty field"],
    min: 5,
    max: 225,
  },
  avatar: {
    type: String,
    required: false,
  },
  about: {
    type: String,
    required: false,
    max: 225,
  },
  socialMedia: {
    type: Map,
    required: false,
    of: String,
  },
  password: {
    type: String,
    min: 5,
    required: [true, "cannot be an empty field"],
  },
  created_at: {
    type: Number,
    default: Date.now(),
  },
  updated_at: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", userSchema);
