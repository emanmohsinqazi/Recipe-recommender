import React from 'react';
import PropTypes from 'prop-types';
import { Clock, Users, Flame, Heart } from 'lucide-react';
import NutrientBadge from './NutrientBadge';

const RecipeCard = ({ recipe, onToggleLike, isLiked }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => onToggleLike(recipe)}
          className={`absolute top-4 right-4 p-2 rounded-full ${
            isLiked ? 'bg-red-500' : 'bg-white'
          } shadow-md transition-colors duration-200`}
        >
          <Heart
            className={`h-5 w-5 ${
              isLiked ? 'text-white fill-current' : 'text-gray-600'
            }`}
          />
        </button>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{recipe.title}</h3>
        
        <div className="flex items-center space-x-4 mb-4 text-gray-600">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{recipe.cookTime}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{recipe.servings} servings</span>
          </div>
          <div className="flex items-center">
            <Flame className="h-4 w-4 mr-1" />
            <span>{recipe.calories} cal</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <NutrientBadge label="Protein" value={recipe.protein} />
          <NutrientBadge label="Carbs" value={recipe.carbs} />
          <NutrientBadge label="Fats" value={recipe.fats} />
        </div>

        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-2">Instructions:</h4>
          <ol className="list-decimal list-inside space-y-2">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="text-gray-600">{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};



export default RecipeCard;