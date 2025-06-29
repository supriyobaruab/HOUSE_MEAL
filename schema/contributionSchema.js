const mongoose = require("mongoose");
const conttibutionSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  result: {
    type: Number,
  },
});
module.exports = mongoose.model("contribution", conttibutionSchema);
