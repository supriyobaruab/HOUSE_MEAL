const mongoose = require("mongoose");
const contribution = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Contribution", contribution);
