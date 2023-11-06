const mongoose = require("mongoose");
const User = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      require: true,
    },
    isAdmin: {
      type: Boolean,
      require: true,
      default: false,
    },
    birtday: {
      type: String,
      require: true,
    },
    gender: {
      type: Number,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("User", User);
