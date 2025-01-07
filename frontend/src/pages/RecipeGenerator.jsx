import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addRecipes } from "../utils/favouriteRecipesSlice";

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
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch=useDispatch();

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
      const inputIngredients = ingredients
        .split(",")
        .map((item) => item.trim());
      const response = await axios.post("http://127.0.0.1:5000/api/recommend", {
        ingredients: inputIngredients,
        ...nutrition,
      });
      setRecipes(response.data);
    } catch (err) {
      setError("Error fetching recommendations. Please try again.");
    }
  };

  const toggleFavorite = async (recipe) => {
    console.log(recipe.recipe_name);
    console.log(recipe.image_url);
    console.log(recipe.ingredient_quantity_list);
    console.log(recipe.ingredients_list);
    console.log(recipe.nutrition);

    try {
      if (favorites.includes(recipe)) {
        // Remove from favorites
        const recipeId = recipe._id;
        await axios.delete(`${BASE_URL}/favorite/recipe/${recipeId}`);
        setFavorites(favorites.filter((fav) => fav !== recipe));
      } else {
        // Add to favorites
        // const recipePayload = {
        //   recipe_name: recipe.recipe_name,
        //   image_url: recipe.image_url,
        //   ingredient_quantity_list: recipe.ingredient_quantity_list,
        //   ingredients_list: recipe.ingredients_list,
        //   nutrition: recipe.nutrition,
        // };
        const response = await axios.post(
          `${BASE_URL}/save/favorite/recipe`,
          {
            recipe_name: recipe.recipe_name,
            image_url: recipe.image_url,
            ingredient_quantity_list: recipe.ingredient_quantity_list,
            ingredients_list: recipe.ingredients_list,
            nutrition: recipe.nutrition,
          },
          {
            withCredentials: true,
          }
        );
        console.log("Saved favorite recipe:", response.data);
        setFavorites([...favorites, recipe]);
      }
    } catch (error) {
      setError("Error updating favorites. Please try again.");
      console.error("Error updating favorites:", error);
    }
  };

  const fetchFavorites = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${BASE_URL}/favorite/recipe`, 
        {
          withCredentials: true,
        }
      );
      console.log("Favorite Recipe", response.data);
      dispatch(addRecipes(response.data));
      setFavorites(response.data);
    } catch (error) {
      setError("Error fetching favorites. Please try again.");
      console.error("Error fetching favorites:", error);
    } finally {
      setIsLoading(false);
    }
};


  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Recipe Recommender
      </h1>

      {/* Input Section */}
      <div className="mb-8 p-6 bg-white rounded shadow-md">
        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-2">
            Ingredients (comma-separated):
          </label>
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="border border-gray-300 p-3 w-full rounded bg-white"
          />
        </div>

        <div className="mb-6">
          <h2 className="font-semibold text-gray-700 mb-4">
            Desired Nutritional Values:
          </h2>
          {Object.keys(nutrition).map((key) => (
            <div key={key} className="mb-3">
              <label className="block font-semibold text-gray-700 mb-1">
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </label>
              <input
                type="number"
                name={key}
                value={nutrition[key]}
                onChange={handleInputChange}
                className="border border-gray-300 p-3 w-full rounded bg-white"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleRecommend}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Recommend Recipes
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      {/* Recommendations Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
          Recommended Recipes:
        </h2>
        {recipes.length === 0 ? (
          <p className="text-gray-600 text-center">
            No recommendations available.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded shadow-lg hover:shadow-xl transition relative"
              >
                <h3 className="text-lg font-bold text-blue-600 mb-2">
                  {recipe.recipe_name}
                </h3>
                <p className="text-gray-700">
                  <strong>Ingredients:</strong>{" "}
                  {recipe.ingredients_list.join(", ")}
                </p>
                <p className="text-gray-700">
                  <strong>Quantities:</strong>{" "}
                  {recipe.ingredient_quantity_list.join(", ")}
                </p>
                <p className="text-gray-700">
                  <strong>Nutrition:</strong>{" "}
                  {Object.entries(recipe.nutrition)
                    .map(
                      ([key, value]) =>
                        `${
                          key.charAt(0).toUpperCase() + key.slice(1)
                        }: ${value}`
                    )
                    .join(", ")}
                </p>
                {recipe.image_url && (
                  <img
                    src={recipe.image_url}
                    alt={recipe.recipe_name}
                    className="mt-4 rounded"
                  />
                )}

                {/* Favorite Icon */}
                <button
                  onClick={() => toggleFavorite(recipe)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-600"
                >
                  <FontAwesomeIcon
                    icon={
                      favorites.includes(recipe) ? solidHeart : regularHeart
                    }
                    size="lg"
                  />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
