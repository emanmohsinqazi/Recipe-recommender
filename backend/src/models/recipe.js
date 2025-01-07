const mongoose = require("mongoose");

const nutritionSchema = new mongoose.Schema({
  calories: Number,
  carbohydrates: Number,
  cholesterol: Number,
  fat: Number,
  fiber: Number,
  protein: Number,
  sodium: Number,
});

const recipeSchema = new mongoose.Schema({
  recipe_name: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  ingredient_quantity_list: {
    type: [String],
    required: true,
  },
  ingredients_list: {
    type: [String],
    required: true,
  },
  nutrition: {
    type: nutritionSchema,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = {
  Recipe,
};
