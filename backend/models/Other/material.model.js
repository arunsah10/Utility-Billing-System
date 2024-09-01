const mongoose = require("mongoose");

const Material = new mongoose.Schema({
  employee: {
    type: String,
    required: true,
  },
  utility: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("Material", Material);
