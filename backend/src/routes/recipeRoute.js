const express = require("express");
const recipeRouter = express.Router();
const {Recipe} = require("../models/recipe.js");
const { userAuth } = require("../middlewares/userAuth.js");

// POST /api/recipes - Save a new favorite recipe
// recipeRouter.post("/save/favorite/recipe", userAuth, async (req, res) => {
//   console.log("Request Body:", req.body);
//   console.log("Authenticated User:", req.user);
//   try {
//     const {
//       recipe_name,
//       image_url,
//       ingredient_quantity_list,
//       ingredients_list,
//       nutrition,
//     } = req.body;

//     const recipe = new Recipe({
//       recipe_name,
//       image_url,
//       ingredient_quantity_list,
//       ingredients_list,
//       nutrition,
//       user: req.user.id,
//     });

//     const savedRecipe = await recipe.save();
//     res.status(201).json(savedRecipe);
//   } catch (error) {
//     res.status(500).json({ error: "Error saving recipe" });
//   }
// });


recipeRouter.post("/save/favorite/recipe", userAuth, async (req, res) => {
  console.log("Favorite Recipe data",req.body);
  console.log(req.user._id);
  try {
    const {
      recipe_name,
      image_url,
      ingredient_quantity_list,
      ingredients_list,
      nutrition,
    } = req.body;

    if (!recipe_name || !Array.isArray(ingredient_quantity_list) || !Array.isArray(ingredients_list) || typeof nutrition !== "object") {
      return res.status(400).json({ error: "Invalid data format" });
    }

    const recipe = new Recipe({
      recipe_name,
      image_url,
      ingredient_quantity_list,
      ingredients_list,
      nutrition,
      user: req.user._id, // Assuming `userAuth` middleware adds `req.user`
    });

    await recipe.save();
    res.status(201).json({ message: "Recipe saved successfully", recipe });
  } catch (error) {
    console.error("Error saving recipe:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});


// GET /api/recipes - Get all favorite recipes for a user
recipeRouter.get("/favorite/recipe", userAuth, async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.user.id });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Error fetching recipes" });
  }
});

// GET /api/recipes/:id - Get a specific recipe
recipeRouter.get("/favorite/recipe/:id", userAuth, async (req, res) => {
  try {
    const recipe = await Recipe.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: "Error fetching recipe" });
  }
});

// DELETE /api/recipes/:id - Delete a recipe
recipeRouter.delete("/favorite/recipe/:id", userAuth, async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting recipe" });
  }
});

module.exports = {
  recipeRouter,
};
