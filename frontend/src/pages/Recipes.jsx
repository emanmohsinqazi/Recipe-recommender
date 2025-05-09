import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Heart, Search, ChevronDown, X, Loader2, ChefHat } from 'lucide-react';
import { toast } from 'react-toastify';
import { useToggleFavoriteMutation, useGetFavoritesQuery } from "../redux/api/favoriteApiSlice";

export default function Recipes() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedSection, setExpandedSection] = useState(null);
  const [toggleFavorite] = useToggleFavoriteMutation();
  const { data: favorites = [], refetch: refetchFavorites } = useGetFavoritesQuery();

  const [nutrition, setNutrition] = useState({
    calories: 0,
    fat: 0,
    carbohydrates: 0,
    protein: 0,
    cholesterol: 0,
    sodium: 0,
    fiber: 0,
  });
  
  const nutritionFields = [
    { key: "calories", label: "Calories", unit: "kcal" },
    { key: "protein", label: "Protein", unit: "g" },
    { key: "carbohydrates", label: "Carbs", unit: "g" },
    { key: "fat", label: "Fat", unit: "g" },
    { key: "fiber", label: "Fiber", unit: "g" },
    { key: "sodium", label: "Sodium", unit: "mg" },
    { key: "cholesterol", label: "Cholesterol", unit: "mg" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNutrition(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };
  
  const handleRecommend = async () => {
    try {
      setIsLoading(true);
      setError("");
      const inputIngredients = ingredients.split(",").map((item) => item.trim());
      const response = await axios.post("http://127.0.0.1:5000/api/recommend", {
        ingredients: inputIngredients,
        ...nutrition,
      });
      setRecipes(response.data);
      setIsLoading(false);
    } catch (err) {
      setError("Error fetching recommendations. Please try again.");
      setIsLoading(false);
    }
  };

  const handleRecipeClick = (recipe) => {
    navigate(`/recipe/${encodeURIComponent(recipe.recipe_name)}`, {
      state: { recipe },
    });
  };

  const handleToggleFavorite = async (e, recipe) => {
    e.preventDefault(); // Prevent any navigation
    e.stopPropagation(); // Stop event from bubbling to parent
  
    try {
      const recipeData = {
        recipe_name: recipe.recipe_name,
        image_url: recipe.image_url || '',
        ingredients: recipe.ingredients || [],
        calories: recipe.calories || 0,
        instructions: recipe.instructions || [],
        nutrition: {
          protein: recipe.nutrition?.protein || 0,
          carbohydrates: recipe.nutrition?.carbohydrates || 0,
          fat: recipe.nutrition?.fat || 0,
          fiber: recipe.nutrition?.fiber || 0,
          sodium: recipe.nutrition?.sodium || 0,
          cholesterol: recipe.nutrition?.cholesterol || 0
        }
      };

      const result = await toggleFavorite(recipeData).unwrap();
      
      // Force a refresh of favorites
      await refetchFavorites();
      
      toast.success(
        result.isFavorite 
          ? 'Recipe added to favorites' 
          : 'Recipe removed from favorites'
      );
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
      toast.error('Failed to update favorites');
    }
  };

  // Added missing toggleSection function
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
          Recipe Recommender
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Enter your ingredients and nutritional preferences to discover delicious recipes tailored just for you
        </p>
      </div>
      
      {/* Main Content Container */}
      <div className="bg-white/20 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl">
        {/* Form Section */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md">
            {/* Ingredients Input */}
            <div className="mb-6">
              <label className="block font-medium text-gray-700 mb-2">
                What ingredients do you have?
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder="Enter ingredients separated by commas"
                  className="border border-gray-200 p-4 pl-12 w-full rounded-xl bg-white/70 text-gray-800 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Example: chicken, rice, broccoli
              </p>
            </div>

            {/* Nutrition Accordion */}
            <div className="mb-6">
              <button
                onClick={() => toggleSection('nutrition')}
                className="flex items-center justify-between w-full p-4 bg-purple-50 rounded-xl text-gray-700 font-medium"
              >
                <span>Nutritional Requirements</span>
                <ChevronDown 
                  className={`h-5 w-5 text-purple-500 transition-transform ${
                    expandedSection === 'nutrition' ? 'transform rotate-180' : ''
                  }`} 
                />
              </button>
              
              {expandedSection === 'nutrition' && (
                <div className="mt-4 p-4 bg-white/50 rounded-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {nutritionFields.map(({ key, label, unit }) => (
                    <div key={key} className="mb-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {label} ({unit})
                      </label>
                      <input
                        type="number"
                        name={key}
                        value={nutrition[key]}
                        onChange={handleInputChange}
                        className="border border-gray-200 p-3 w-full rounded-lg bg-white text-gray-800 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleRecommend}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl hover:shadow-lg transition-all duration-300 w-full text-lg font-medium flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Finding Recipes...
                </>
              ) : (
                "Recommend Recipes"
              )}
            </button>
          </div>
        </div>

        {/* Recipes Section */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
            {recipes.length > 0 ? "Recommended Recipes" : "Your Recommendations"}
          </h2>
            
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-lg max-w-3xl mx-auto">
              <div className="flex items-center">
                <X className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}
            
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="animate-spin h-12 w-12 text-purple-600 mb-4" />
              <p className="text-gray-600">Finding the perfect recipes for you...</p>
            </div>
          ) : recipes.length === 0 ? (
            <div className="bg-white/50 backdrop-blur-sm p-8 rounded-xl text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center p-3 bg-purple-50 rounded-full mb-4">
                <ChefHat className="h-6 w-6 text-purple-500" />
              </div>
              <p className="text-gray-600 text-lg mb-2">
                No recommendations available yet.
              </p>
              <p className="text-gray-500">
                Enter your ingredients and nutritional preferences to get personalized recipe recommendations.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe, index) => (
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
                      <Heart
                        className={`h-5 w-5 ${
                          favorites.some((fav) => fav.recipe_name === recipe.recipe_name)
                            ? "text-red-500 fill-red-500"
                            : "text-gray-400"
                        }`}
                      />
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
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}