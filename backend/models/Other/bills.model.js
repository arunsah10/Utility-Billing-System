const mongoose = require("mongoose");

const Bills = new mongoose.Schema({
  enrollmentNo: {
    type: Number,
    required: true,
  },
  internal: {
    type: {},
  }
}, { timestamps: true });

module.exports = mongoose.model("Bill", Bills);
