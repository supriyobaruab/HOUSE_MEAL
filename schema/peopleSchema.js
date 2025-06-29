const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
  },
  today: {
    type: Number,
  },
  lastDate: {
    type: String,
  },
  submittedToday: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Person", personSchema);
