const mongoose = require("mongoose");
const Shoe = new mongoose.Schema(
  {
    size: {
      type: Array,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    img: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
      require: true,
    },
    color: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Shoe", Shoe);
