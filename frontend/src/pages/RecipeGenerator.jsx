import React, { useState } from "react";
import axios from "axios";

function App() {
  const [ingredients, setIngredients] = useState("");
  const [nutrition, setNutrition] = useState({
    calories: 0,
    fat: 0,
    carbohydrates: 0,
    protein: 0,
    cholesterol: 0,
    sodium: 0,
    fiber: 0,
  });
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setNutrition({ ...nutrition, [e.target.name]: e.target.value });
  };

  const handleRecommend = async () => {
    try {
      setError("");
      const inputIngredients = ingredients.split(",").map((item) => item.trim());
      const response = await axios.post("http://127.0.0.1:5000/api/recommend", {
        ingredients: inputIngredients,
        ...nutrition,
      });
      setRecipes(response.data);
    } catch (err) {
      setError("Error fetching recommendations. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Recipe Recommender</h1>

      {/* Input Ingredients */}
      <div className="mb-6 p-6 border border-blue-200 bg-white shadow-lg rounded-lg">
        <label className="block font-semibold text-blue-700 mb-2">
          Enter Ingredients (comma-separated):
        </label>
        <input
          type="text"
          className="border border-gray-300 p-3 w-full bg-gray-100 text-gray-800 rounded-md placeholder-gray-500 shadow-sm focus:outline-blue-400"
          placeholder="e.g., egg, milk, sugar"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
      </div>

      {/* Nutrition Inputs */}
      <div className="mb-6 p-6 border border-blue-200 bg-white shadow-lg rounded-lg">
        <h2 className="font-semibold text-blue-700 mb-4">Enter Desired Nutritional Values:</h2>
        <div className="grid grid-cols-2 gap-6">
          {Object.keys(nutrition).map((key) => (
            <div key={key}>
              <label className="block font-semibold text-blue-700 mb-1">
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </label>
              <input
                type="number"
                name={key}
                value={nutrition[key]}
                onChange={handleInputChange}
                className="border border-gray-300 p-3 w-full bg-gray-100 text-gray-800 rounded-md shadow-sm placeholder-gray-500 focus:outline-blue-400"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Recommend Button */}
      <button
        onClick={handleRecommend}
        className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
      >
        Recommend Recipes
      </button>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Recipe Recommendations */}
      <div className="mt-8 p-6 border border-blue-200 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">Recommended Recipes:</h2>
        {recipes.length === 0 ? (
          <p className="text-gray-700">
            No recommendations available. Try different ingredients or nutrition values.
          </p>
        ) : (
          recipes.map((recipe, index) => (
            <div key={index} className="p-4 border border-gray-300 bg-gray-50 shadow-md rounded-lg mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{recipe.recipe_name}</h3>
              <p className="text-sm text-gray-600">
                <strong>Ingredients:</strong> {recipe.ingredients_list.join(", ")}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Quantities:</strong> {recipe.ingredient_quantity_list.join(", ")}
              </p>
              {recipe.image_url && (
                <img
                  src={recipe.image_url}
                  alt={recipe.recipe_name}
                  className="mt-4 rounded-md shadow-sm"
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
