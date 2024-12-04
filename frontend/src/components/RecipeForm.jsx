import React, { useState } from 'react';
import PropTypes from 'prop-types';

const RecipeForm = ({ onSubmit }) => {
  const [ingredients, setIngredients] = useState('');
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fats, setFats] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ingredients: ingredients.split(',').map(i => i.trim()),
      protein,
      carbs,
      fats,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">
          Ingredients (comma-separated)
        </label>
        <textarea
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          placeholder="tomatoes, chicken, rice..."
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="protein" className="block text-sm font-medium text-gray-700">
            Protein (g)
          </label>
          <input
            type="number"
            id="protein"
            value={protein}
            onChange={(e) => setProtein(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            min="0"
          />
        </div>

        <div>
          <label htmlFor="carbs" className="block text-sm font-medium text-gray-700">
            Carbs (g)
          </label>
          <input
            type="number"
            id="carbs"
            value={carbs}
            onChange={(e) => setCarbs(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            min="0"
          />
        </div>

        <div>
          <label htmlFor="fats" className="block text-sm font-medium text-gray-700">
            Fats (g)
          </label>
          <input
            type="number"
            id="fats"
            value={fats}
            onChange={(e) => setFats(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            min="0"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors"
      >
        Find Recipes
      </button>
    </form>
  );
};


export default RecipeForm;