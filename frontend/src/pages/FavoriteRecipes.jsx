

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Heart, ChefHat } from 'lucide-react';
import { toggleFavorite } from "../redux/features/favorites/favoriteSlice";

export default function FavoriteRecipes() {
  const favorites = useSelector((state) => state.favorites.favorites);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggleFavorite = (e, recipe) => {
    e.stopPropagation();
    dispatch(toggleFavorite(recipe));
  };

  const handleRecipeClick = (recipe) => {
    navigate(`/recipe/${encodeURIComponent(recipe.recipe_name)}`, {
      state: { recipe },
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4"
      style={{ background: "linear-gradient(to right, #bfdbfe, #e9d5ff)" }}
    >
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-white/30 backdrop-blur-sm rounded-full mb-4">
            <Heart className="h-8 w-8 text-red-500 fill-red-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            Your Favorite Recipes
          </h1>
          <p className="text-gray-700 max-w-2xl mx-auto">
            All your saved recipes in one place
          </p>
        </div>

        {/* Main Content Container */}
        <div className="bg-white/20 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl">
          {/* Recipes Section */}
          <div className="max-w-5xl mx-auto">
            {favorites.length === 0 ? (
              <div className="bg-white/50 backdrop-blur-sm p-8 rounded-xl text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center justify-center p-3 bg-purple-50 rounded-full mb-4">
                  <ChefHat className="h-6 w-6 text-purple-500" />
                </div>
                <p className="text-gray-600 text-lg mb-2">
                  No favorite recipes yet.
                </p>
                <p className="text-gray-500">
                  Add recipes to your favorites by clicking the heart icon on recipes you love.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((recipe, index) => (
                  <div
                    key={index}
                    className="bg-white/80 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
                    onClick={() => handleRecipeClick(recipe)}
                  >
                    {recipe.image_url ? (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={recipe.image_url || "/placeholder.svg"}
                          alt={recipe.recipe_name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
                        <p className="text-gray-500 italic">No image available</p>
                      </div>
                    )}
                    
                    <div className="p-5 relative">
                      <button
                        className="absolute top-5 right-5 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
                        onClick={(e) => handleToggleFavorite(e, recipe)}
                      >
                        <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                      </button>
                      
                      <h3 className="text-xl font-bold text-gray-800 mb-2 pr-10">
                        {recipe.recipe_name}
                      </h3>
                      
                      {recipe.ingredients && (
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {recipe.ingredients.slice(0, 3).join(", ")}
                          {recipe.ingredients.length > 3 && "..."}
                        </p>
                      )}
                      
                      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                        <div className="flex space-x-2">
                          {recipe.calories && (
                            <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs">
                              {recipe.calories} cal
                            </span>
                          )}
                          {recipe.cooking_time && (
                            <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded-md text-xs">
                              {recipe.cooking_time} min
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-purple-600 font-medium">View Recipe →</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
