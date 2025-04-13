import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Recipes() {
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
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (value < 0 || isNaN(value)) {
      alert("Invalid value! Please enter a positive number.");
    } else {
      setNutrition({ ...nutrition, [name]: value });
    }
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

  const handleRecipeClick = (recipe) => {
    navigate(`/recipe/${encodeURIComponent(recipe.recipe_name)}`, {
      state: { recipe },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <div className="w-full max-w-7xl flex flex-row-reverse gap-12">
        {/* Form Section */}
        <div className="w-2/5 bg-white p-10 rounded-lg shadow-xl">
          <h1 className="text-4xl font-bold text-blue-500 mb-8 text-center">
            Recipe Recommender
          </h1>

          <div className="mb-6">
            <label className="block font-semibold text-gray-700 mb-2">
              Ingredients (comma-separated):
            </label>
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="border border-gray-300 p-4 w-full rounded bg-pink-200 text-gray-900"
            />
          </div>

          <div className="mb-6">
            <h2 className="font-semibold text-gray-700 mb-4">
              Desired Nutritional Values:
            </h2>
            {Object.keys(nutrition).map((key) => (
              <div key={key} className="mb-4">
                <label className="block font-semibold text-gray-700 mb-1">
                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                </label>
                <input
                  type="number"
                  name={key}
                  value={nutrition[key]}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-4 w-full rounded bg-pink-200 text-gray-900"
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleRecommend}
            className="bg-blue-500 text-white py-3 px-5 rounded-lg hover:bg-blue-600 transition w-full text-lg"
          >
            Recommend Recipes
          </button>
        </div>

        {/* Recipes Section */}
        <div className="w-3/5">
          <h2 className="text-2xl font-semibold mb-6 text-white text-center">
            Recommended Recipes:
          </h2>
          {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
          {recipes.length === 0 ? (
            <p className="text-gray-400 text-center text-lg">
              No recommendations available.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {recipes.map((recipe, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition relative cursor-pointer"
                  onClick={() => handleRecipeClick(recipe)}
                >
                  <button
                    className="absolute top-4 right-4 text-2xl transition transform hover:scale-110"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFavorites((prev) =>
                        prev.some((fav) => fav.recipe_name === recipe.recipe_name)
                          ? prev.filter((fav) => fav.recipe_name !== recipe.recipe_name)
                          : [...prev, recipe]
                      );
                    }}
                  >
                    <FaHeart
                      className={
                        favorites.some((fav) => fav.recipe_name === recipe.recipe_name)
                          ? "text-red-500"
                          : "text-gray-400"
                      }
                    />
                  </button>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {recipe.recipe_name}
                  </h3>
                  {recipe.image_url && (
                    <img
                      src={recipe.image_url}
                      alt={recipe.recipe_name}
                      className="mt-4 rounded-lg"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Recipes;