

import { useState } from "react"

const RecipeCard = ({ recipe }) => (
  <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-1">
    <img src={recipe.image || "/placeholder.svg"} alt={recipe.name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">{recipe.name}</h2>
      <p className="text-gray-300 mb-4">{recipe.description}</p>
      <p className="text-sm text-gray-400 mb-4">Key Ingredients: {recipe.keyIngredients.join(", ")}</p>
      <button
        onClick={() => {
          /* Navigate to recipe details */
        }}
        className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
      >
        More Details
      </button>
    </div>
  </div>
)

const Recipes = () => {
  const [ingredients, setIngredients] = useState("")
  const [dietaryConditions, setDietaryConditions] = useState("")
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)

  // Mock data for recipes
  const mockRecipes = [
    {
      id: 1,
      name: "Vegetable Stir Fry",
      description: "A quick and healthy vegetable stir fry.",
      image: "https://example.com/stir-fry.jpg",
      keyIngredients: ["bell peppers", "broccoli", "carrots", "soy sauce"],
    },
    {
      id: 2,
      name: "Chicken Curry",
      description: "A flavorful and creamy chicken curry.",
      image: "https://example.com/chicken-curry.jpg",
      keyIngredients: ["chicken", "coconut milk", "curry powder", "onions"],
    },
    {
      id: 3,
      name: "Quinoa Salad",
      description: "A refreshing and nutritious quinoa salad.",
      image: "https://example.com/quinoa-salad.jpg",
      keyIngredients: ["quinoa", "cucumber", "tomatoes", "feta cheese"],
    },
    {
      id: 4,
      name: "Spaghetti Carbonara",
      description: "A classic Italian pasta dish with a creamy egg sauce.",
      image: "https://example.com/carbonara.jpg",
      keyIngredients: ["spaghetti", "eggs", "pancetta", "parmesan cheese"],
    },
    {
      id: 5,
      name: "Vegetarian Chili",
      description: "A hearty and spicy vegetarian chili.",
      image: "https://example.com/veg-chili.jpg",
      keyIngredients: ["beans", "tomatoes", "bell peppers", "onions", "chili powder"],
    },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Filter recipes based on ingredients and dietary conditions
    const filteredRecipes = mockRecipes.filter((recipe) => {
      const hasIngredients = ingredients
        .split(",")
        .some((ingredient) =>
          recipe.keyIngredients.some((key) => key.toLowerCase().includes(ingredient.trim().toLowerCase())),
        )
      const meetsDietaryConditions =
        !dietaryConditions ||
        recipe.keyIngredients.some((ingredient) => ingredient.toLowerCase().includes(dietaryConditions.toLowerCase()))
      return hasIngredients && meetsDietaryConditions
    })

    setRecipes(filteredRecipes)
    setLoading(false)
  }

  return (
    <div className="flex-1 p-8 overflow-auto bg-[#0f0f10] text-white ml-[4%] xl:ml-[4%] lg:ml-[4%] md:ml-0 sm:ml-0">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Recipe Recommendations</h1>

        <form onSubmit={handleSubmit} className="mb-12">
          <div className="mb-4">
            <label htmlFor="ingredients" className="block mb-2">
              Ingredients
            </label>
            <input
              type="text"
              id="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-white"
              placeholder="Enter ingredients separated by commas"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dietaryConditions" className="block mb-2">
              Dietary Conditions
            </label>
            <input
              type="text"
              id="dietaryConditions"
              value={dietaryConditions}
              onChange={(e) => setDietaryConditions(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-white"
              placeholder="Enter dietary conditions"
            />
          </div>
          <button
            type="submit"
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors w-full"
            disabled={loading}
          >
            {loading ? "Searching..." : "Get Recommendations"}
          </button>
        </form>

        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">
            No recipes found. Try different ingredients or dietary conditions.
          </p>
        )}
      </div>
    </div>
  )
}

export default Recipes






// import { useState } from "react";

// const RecipeCard = ({ recipe }) => (
//   <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-1">
//     <img src={recipe.image || "/placeholder.svg"} alt={recipe.name} className="w-full h-48 object-cover" />
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-2">{recipe.name}</h2>
//       <p className="text-gray-300 mb-4">{recipe.description}</p>
//       <p className="text-sm text-gray-400 mb-4">Key Ingredients: {recipe.keyIngredients.join(", ")}</p>
//     </div>
//   </div>
// );

// const Recipes = () => {
//   const [inputs, setInputs] = useState({
//     calories: "",
//     fat: "",
//     carbohydrates: "",
//     protein: "",
//     cholesterol: "",
//     sodium: "",
//     fiber: "",
//   });
//   const [recipes, setRecipes] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setInputs({ ...inputs, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch(`${BASE_URL}/api/recommend`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(inputs),
//       });
      
//       const data = await response.json();
//       setRecipes(data.recipes || []);
//     } catch (error) {
//       console.error("Error fetching recipes:", error);
//     }
    
//     setLoading(false);
//   };

//   return (
//     <div className="p-8 bg-[#0f0f10] text-white">
//       <h1 className="text-4xl font-bold mb-8 text-center">Recipe Recommendations</h1>
//       <form onSubmit={handleSubmit} className="mb-12">
//         {Object.keys(inputs).map((key) => (
//           <div className="mb-4" key={key}>
//             <label htmlFor={key} className="block mb-2 capitalize">{key}</label>
//             <input
//               type="text"
//               id={key}
//               name={key}
//               value={inputs[key]}
//               onChange={handleChange}
//               className="w-full p-2 rounded bg-gray-800 text-white"
//               placeholder={`Enter ${key}`}
//             />
//           </div>
//         ))}
//         <button
//           type="submit"
//           className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors w-full"
//           disabled={loading}
//         >
//           {loading ? "Searching..." : "Get Recommendations"}
//         </button>
//       </form>
//       {recipes.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {recipes.map((recipe, index) => (
//             <RecipeCard key={index} recipe={recipe} />
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-400">No recipes found.</p>
//       )}
//     </div>
//   );
// };

// export default Recipes;





