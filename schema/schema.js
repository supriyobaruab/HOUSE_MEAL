const mongoose = require("mongoose");
const date = new Date().toISOString().split("T")[0];
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  total_count: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    default: date,
  },
});
module.exports = mongoose.model("mealcounters", schema);
