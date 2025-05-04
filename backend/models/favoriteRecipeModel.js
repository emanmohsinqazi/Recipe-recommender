import mongoose from "mongoose";

const favoriteRecipeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipe_name: {
      type: String,
      required: true,
    },
    image_url: String,
    ingredients: [String],
    calories: Number,
    instructions: [String],
    nutrition: {
      protein: Number,
      carbohydrates: Number,
      fat: Number,
      fiber: Number,
      sodium: Number,
      cholesterol: Number
    }
  },
  {
    timestamps: true,
  }
);

// Compound index to prevent duplicate favorites for the same user
favoriteRecipeSchema.index({ user: 1, recipe_name: 1 }, { unique: true });

const FavoriteRecipe = mongoose.model("FavoriteRecipe", favoriteRecipeSchema);
export default FavoriteRecipe;

