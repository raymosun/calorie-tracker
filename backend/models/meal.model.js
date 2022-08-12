const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mealSchema = new Schema({
  username: { type: String, required: true },
  mealName: { type: String, required: true },
  calories: { type: Number, required: true},
  mealTime: { type: Date, required: true },
}, {
  timestamps: true,
});

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;