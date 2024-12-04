import React from 'react';
import RecipeForm from '../components/RecipeForm';
import RecipeCard from '../components/RecipeCard';
import { useRecipes } from '../context/RecipeContext';

const GenerateRecipe = () => {
  const {
    recipes,
    showResults,
    likedRecipes,
    handleFormSubmit,
    handleToggleLike,
  } = useRecipes();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Recipe Recommender</h1>
        <p className="text-lg text-gray-600">
          Enter your ingredients and nutritional preferences to find the perfect recipe
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-12">
        <RecipeForm onSubmit={handleFormSubmit} />
      </div>

      {showResults && (
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommended Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recipes.map((recipe, index) => (
              <RecipeCard
                key={index}
                recipe={recipe}
                onToggleLike={handleToggleLike}
                isLiked={likedRecipes.some((r) => r.title === recipe.title)}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default GenerateRecipe;