import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

const RecipeGenerator = () => {
  const [formData, setFormData] = useState({
    calories: '',
    proteins: '',
    carbohydrates: '',
    ingredients: ['']
  });
  const [recipes, setRecipes] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData(prevState => ({
      ...prevState,
      ingredients: newIngredients
    }));
  };

  const addIngredient = () => {
    setFormData(prevState => ({
      ...prevState,
      ingredients: [...prevState.ingredients, '']
    }));
  };

  const removeIngredient = (index) => {
    const newIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData(prevState => ({
      ...prevState,
      ingredients: newIngredients
    }));
  };

  const generateRecipes = (e) => {
    e.preventDefault();
    // This is where you would typically make an API call to generate recipes
    // For this example, we'll just create some dummy recipes
    const dummyRecipes = [
      { name: "Protein-Packed Salad", ingredients: ["Chicken", "Quinoa", "Mixed Greens", "Avocado"], instructions: "Mix all ingredients in a bowl. Dress with olive oil and lemon juice." },
      { name: "Carb-Loaded Pasta", ingredients: ["Whole Wheat Pasta", "Tomato Sauce", "Parmesan Cheese"], instructions: "Cook pasta. Heat sauce. Combine and top with cheese." },
      { name: "Balanced Stir Fry", ingredients: ["Tofu", "Mixed Vegetables", "Brown Rice", "Soy Sauce"], instructions: "Stir fry tofu and veggies. Serve over rice. Drizzle with soy sauce." },
      { name: "Hearty Vegetable Soup", ingredients: ["Mixed Vegetables", "Vegetable Broth", "Beans", "Herbs"], instructions: "Simmer all ingredients in a pot until vegetables are tender." },
      { name: "Energy-Boosting Smoothie", ingredients: ["Banana", "Spinach", "Greek Yogurt", "Almond Milk"], instructions: "Blend all ingredients until smooth. Serve chilled." }
    ];
    setRecipes(dummyRecipes);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Recipe Generator</h1>
      <form onSubmit={generateRecipes} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="calories" className="block text-sm font-medium text-gray-700 mb-1">Calories</label>
            <input
              type="number"
              id="calories"
              name="calories"
              value={formData.calories}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="proteins" className="block text-sm font-medium text-gray-700 mb-1">Proteins (g)</label>
            <input
              type="number"
              id="proteins"
              name="proteins"
              value={formData.proteins}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="carbohydrates" className="block text-sm font-medium text-gray-700 mb-1">Carbohydrates (g)</label>
            <input
              type="number"
              id="carbohydrates"
              name="carbohydrates"
              value={formData.carbohydrates}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients</label>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded-md mr-2"
                placeholder="Enter an ingredient"
                required
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          ))}
          {/* <button
            type="button"
            onClick={addIngredient}
            className="mt-2 flex items-center text-blue-500 hover:text-blue-600"
          >
            <PlusCircle size={20} className="mr-1" /> Add Ingredient
          </button> */}
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
        >
          Generate Recipes
        </button>
      </form>

      {recipes.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Generated Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recipes.map((recipe, index) => (
              <div key={index} className="bg-white p-4 rounded-md shadow-md">
                <img
                  src={`/biryani.png?height=200&width=300&text=${encodeURIComponent(recipe.name)}`}
                  alt={recipe.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{recipe.name}</h3>
                <h4 className="font-medium mb-1">Ingredients:</h4>
                <ul className="list-disc list-inside mb-2">
                  {recipe.ingredients.map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                  ))}
                </ul>
                <h4 className="font-medium mb-1">Instructions:</h4>
                <p>{recipe.instructions}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeGenerator;