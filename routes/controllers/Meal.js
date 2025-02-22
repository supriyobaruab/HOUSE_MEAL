const mongoose = require('mongoose');
const schema   = require('../../schema/schema');
const Meal     = mongoose.model("MealCounter",schema);
module.exports = Meal;