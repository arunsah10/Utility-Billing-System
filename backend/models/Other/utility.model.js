const mongoose = require("mongoose");

const Utility = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("Utility", Utility);
