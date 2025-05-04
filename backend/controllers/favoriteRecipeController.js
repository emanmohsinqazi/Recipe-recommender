import asyncHandler from '../middlewares/asyncHandler.js';
import FavoriteRecipe from '../models/favoriteRecipeModel.js';

// @desc    Get user's favorite recipes
// @route   GET /api/favorites
// @access  Private
const getFavorites = asyncHandler(async (req, res) => {
  const favorites = await FavoriteRecipe.find({ user: req.user._id });
  res.json(favorites);
});

// @desc    Add a recipe to favorites
// @route   POST /api/favorites
// @access  Private
const addFavorite = asyncHandler(async (req, res) => {
  const {
    recipe_name,
    image_url,
    ingredients,
    calories,
    instructions,
    nutrition
  } = req.body;

  const alreadyFavorited = await FavoriteRecipe.findOne({
    user: req.user._id,
    recipe_name: recipe_name
  });

  if (alreadyFavorited) {
    res.status(400);
    throw new Error('Recipe already in favorites');
  }

  const favorite = await FavoriteRecipe.create({
    user: req.user._id,
    recipe_name,
    image_url,
    ingredients,
    calories,
    instructions,
    nutrition
  });

  res.status(201).json(favorite);
});

// @desc    Remove a recipe from favorites
// @route   DELETE /api/favorites/:recipe_name
// @access  Private
const removeFavorite = asyncHandler(async (req, res) => {
  // Decode the URL-encoded recipe name
  const recipe_name = decodeURIComponent(req.params.recipe_name);
  
  console.log(`===== REMOVE FAVORITE =====`);
  console.log(`User: ${req.user._id}`);
  console.log(`Recipe name (decoded): ${recipe_name}`);
  
  try {
    // First check if the recipe exists in favorites
    const favorite = await FavoriteRecipe.findOne({
      user: req.user._id,
      recipe_name: recipe_name
    });

    if (!favorite) {
      console.log(`Recipe not found in favorites: "${recipe_name}"`);
      res.status(404).json({ 
        message: 'Recipe not found in favorites',
        success: false
      });
      return;
    }

    console.log(`Found favorite: ${favorite._id}`);

    // Use deleteOne instead of remove (which is deprecated)
    const result = await FavoriteRecipe.deleteOne({
      _id: favorite._id
    });
    
    console.log(`Delete result:`, result);
    
    if (result.deletedCount === 1) {
      console.log('Successfully removed recipe from favorites');
      res.status(200).json({ 
        message: 'Recipe removed from favorites', 
        success: true 
      });
    } else {
      console.error('Delete operation did not remove any documents');
      res.status(500).json({ 
        message: 'Failed to remove recipe from favorites',
        success: false
      });
    }
  } catch (error) {
    console.error('Error in removeFavorite:', error);
    res.status(500).json({ 
      message: 'Server error while removing favorite',
      error: error.message,
      success: false 
    });
  }
});

// @desc    Toggle favorite status of a recipe
// @route   POST /api/favorites/toggle
// @access  Private
const toggleFavorite = asyncHandler(async (req, res) => {
  const {
    recipe_name,
    image_url,
    ingredients,
    calories,
    instructions,
    nutrition
  } = req.body;

  try {
    const existingFavorite = await FavoriteRecipe.findOne({
      user: req.user._id,
      recipe_name: recipe_name
    });

    if (existingFavorite) {
      // Use deleteOne instead of remove (which is deprecated)
      const result = await FavoriteRecipe.deleteOne({ _id: existingFavorite._id });
      if (result.deletedCount === 1) {
        res.json({ 
          message: 'Recipe removed from favorites', 
          isFavorite: false,
          success: true 
        });
      } else {
        res.status(500).json({
          message: 'Failed to remove recipe from favorites',
          success: false
        });
      }
  } else {
    const favorite = await FavoriteRecipe.create({
      user: req.user._id,
      recipe_name,
      image_url,
      ingredients,
      calories,
      instructions,
      nutrition
    });
    res.status(201).json({ 
      favorite, 
      isFavorite: true,
      success: true
    });
  }
  } catch (error) {
    console.error('Error in toggleFavorite:', error);
    res.status(500).json({ 
      message: 'Server error while toggling favorite',
      error: error.message,
      success: false 
    });
  }
});

// @desc    Check if a recipe is favorited
// @route   GET /api/favorites/check/:recipe_name
// @access  Private
const checkFavorite = asyncHandler(async (req, res) => {
  // Decode the URL-encoded recipe name
  const recipe_name = decodeURIComponent(req.params.recipe_name);

  try {
    const favorite = await FavoriteRecipe.findOne({
      user: req.user._id,
      recipe_name: recipe_name
    });

    res.json({ 
      isFavorite: !!favorite,
      success: true 
    });
  } catch (error) {
    console.error('Error in checkFavorite:', error);
    res.status(500).json({ 
      message: 'Server error while checking favorite status',
      error: error.message,
      success: false 
    });
  }
});

export {
  getFavorites,
  addFavorite,
  removeFavorite,
  toggleFavorite,
  checkFavorite
};

