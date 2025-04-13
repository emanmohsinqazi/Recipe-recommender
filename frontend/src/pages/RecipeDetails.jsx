import { useLocation } from "react-router-dom";

function RecipeDetails() {
  const { state } = useLocation();
  const recipe = state?.recipe;

  if (!recipe) {
    return <h2 className="text-white text-center text-2xl">No recipe details available.</h2>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <div className="w-full max-w-3xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg text-white">
        <h1 className="text-3xl font-bold mb-4">{recipe.recipe_name}</h1>
        {recipe.image_url && (
          <img
            src={recipe.image_url}
            alt={recipe.recipe_name}
            className="w-full rounded-lg mb-4"
          />
        )}
        <h2 className="text-xl font-semibold mb-2">Ingredients:</h2>
        <ul className="list-disc pl-6 mb-4">
          {recipe.ingredients_list.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h2 className="text-xl font-semibold mb-2">Quantities:</h2>
        <ul className="list-disc pl-6 mb-4">
          {recipe.ingredient_quantity_list.map((quantity, index) => (
            <li key={index}>{quantity}</li>
          ))}
        </ul>
        <h2 className="text-xl font-semibold mb-2">Nutritional Information:</h2>
        <ul className="list-disc pl-6">
          {Object.entries(recipe.nutrition).map(([key, value]) => (
            <li key={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RecipeDetails;
